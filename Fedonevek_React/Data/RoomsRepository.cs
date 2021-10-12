using Fedonevek_React.Controllers.Dto;
using Fedonevek_React.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Fedonevek_React.Data
{
    public class RoomsRepository : IRoomsRepository
    {
        private readonly ApplicationDbContext db;

        public RoomsRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        private static Room ToModel(DbRoom value)
        {
            return new Room(value.ID, value.Name, value.CurrentWord, value.CurrentNumber, value.BluesTurn, value.Finished, value.Started, value.BlueScore, value.RedScore, value.BluePlayerRobot, value.BlueSpyRobot, value.RedPlayerRobot, value.RedSpyRobot);
        }


        private static Card ToCard(DbCard value)
        {
            return new Card(value.ID, value.Word, value.Position, value.Revealed, value.Color);
        }
        private static Player ToPlayer(DbPlayer value)
        {
            return new Player(value.ID, value.IsBlue, value.IsSpy, value.RoomId, value.UserId, value.UserName);
        }

        private static Word ToWord(DbWord value)
        {
            return new Word(value.ID, value.Keyword);
        }

        public IReadOnlyCollection<Room> List()
        {
            return db.Rooms.Select(ToModel).ToList();
        }


        public Room FindById(int id)
        {
            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == id);
            if (dbRoom == null)
            {
                return null;
            }
            else return ToModel(dbRoom);
        }

        public Room Create(CreateRoom value)
        {
            if (db.Rooms.Any(s => EF.Functions.Like(s.Name, value.Name)))
                throw new ArgumentException("Ilyen nevű szoba már létezik!");

            var newRecord = new DbRoom { Name = value.Name, BluesTurn = false, Started = false, Finished = false, BlueScore = 9, RedScore = 8 };
            db.Rooms.Add(newRecord);
            db.SaveChanges();

            //********************
            var wordList = MI_Test.Program.getWordList("dataset.xml");
            var elso = wordList[0];
            //var wordList = db.Words.Select(ToWord).ToList();

            var rand = new Random();
            List<int> intList = new List<int>();
            while (intList.Count < 25)
            {
                int number = rand.Next(0, wordList.Count());
                if (intList.Contains(number) == false)
                {
                    intList.Add(number);
                }
            }

            List<int> colorList = new List<int>();
            while (colorList.Count < 25)
            {
                colorList.Add(0);
            }
            int blueCount = 0;
            while (blueCount < 9)
            {
                int number = rand.Next(0, 25);
                if (colorList[number] == 0)
                {
                    colorList[number] = 1;
                    blueCount++;
                }
            }
            int redCount = 0;
            while (redCount < 8)
            {
                int number = rand.Next(0, 25);
                if (colorList[number] == 0)
                {
                    colorList[number] = 2;
                    redCount++;
                }
            }
            int blackCount = 0;
            while (blackCount < 1)
            {
                int number = rand.Next(0, 25);
                if (colorList[number] == 0)
                {
                    colorList[number] = 3;
                    blackCount++;
                }
            }



            int position = 1;

            if (colorList.Count == 25)
            {
                foreach (int number in intList)
                {
                    var newCard = new DbCard { Position = position, Revealed = false, RoomId = newRecord.ID, Word = wordList[number], Color = colorList[position - 1] };
                    db.Cards.Add(newCard);
                    db.SaveChanges();
                    position++;
                }
            }


            return new Room(newRecord.ID, newRecord.Name, newRecord.CurrentWord, newRecord.CurrentNumber, newRecord.BluesTurn, newRecord.Finished, newRecord.Started, newRecord.BlueScore, newRecord.RedScore);
        }

        public Room NewWord(NewWord value)
        {
            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == value.RoomID);
            if (dbRoom == null)
            {
                return null;
            }
            else
            {
                using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
                {
                    dbRoom.CurrentWord = value.Word;
                    dbRoom.CurrentNumber = value.Number;
                    db.Rooms.Update(dbRoom);
                    db.SaveChanges();
                    tran.Commit();
                    return ToModel(dbRoom);
                }
            }
        }

        //ezután*******************************
        public Room Pass(int roomid)
        {
            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == roomid);
            if (dbRoom == null)
            {
                return null;
            }
            else
            {
                using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
                {
                    dbRoom.CurrentNumber = 0;
                    db.Rooms.Update(dbRoom);
                    db.SaveChanges();
                    tran.Commit();
                    return ToModel(dbRoom);
                }
            }
        }

        public void Finished(int roomId, bool blueWon)
        {
            var dbPlayers = db.Players.Where(p => p.RoomId == roomId).Select(ToPlayer).ToList();
            foreach (Player p in dbPlayers)
            {
                var dbUser = db.Users.FirstOrDefault(u => u.Id == p.UserId);
                if (p.IsBlue == blueWon)
                {
                    dbUser.Point += 100;
                }
                if (p.IsBlue != blueWon)
                {
                    dbUser.Point -= 100;
                }
                db.Users.Update(dbUser);
            }
            db.SaveChanges();
        }

        //ezután*******************************
        public Room RevealOne(int cardId)
        {
            var dbCard = db.Cards.FirstOrDefault(c => c.ID == cardId);

            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == dbCard.RoomId);
            if (dbRoom == null)
            {
                return null;
            }
            else
            {
                using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
                {
                    if (dbCard.Color == 1 && dbRoom.BluesTurn && dbRoom.BlueScore > 0 && dbRoom.CurrentNumber > 0)
                    {
                        dbCard.Revealed = true;
                        dbRoom.BlueScore -= 1;
                        dbRoom.CurrentNumber -= 1;
                    }
                    else if (dbCard.Color == 1 && !dbRoom.BluesTurn && dbRoom.BlueScore > 0 && dbRoom.CurrentNumber > 0)
                    {
                        dbCard.Revealed = true;
                        dbRoom.BlueScore -= 1;
                        dbRoom.CurrentNumber = 0;
                    }
                    else if (dbCard.Color == 2 && !dbRoom.BluesTurn && dbRoom.RedScore > 0 && dbRoom.CurrentNumber > 0)
                    {
                        dbCard.Revealed = true;
                        dbRoom.RedScore -= 1;
                        dbRoom.CurrentNumber -= 1;
                    }
                    else if (dbCard.Color == 2 && dbRoom.BluesTurn && dbRoom.RedScore > 0 && dbRoom.CurrentNumber > 0)
                    {
                        dbCard.Revealed = true;
                        dbRoom.RedScore -= 1;
                        dbRoom.CurrentNumber = 0;
                    }

                    else if (dbCard.Color == 0 && dbRoom.CurrentNumber > 0)
                    {
                        dbCard.Revealed = true;
                        dbRoom.CurrentNumber = 0;
                    }
                    else if (dbCard.Color == 3)
                    {
                        dbCard.Revealed = true;
                        if (dbRoom.BluesTurn)
                        {
                            dbRoom.RedScore = 0;
                            dbRoom.Finished = true;
                        }
                        else
                        {
                            dbRoom.BlueScore = 0;
                            dbRoom.Finished = true;
                        }

                    }

                    if (dbRoom.RedScore == 0)
                    {
                        dbRoom.Finished = true;
                        Finished(dbRoom.ID, false);
                    }
                    else if (dbRoom.BlueScore == 0)
                    {
                        dbRoom.Finished = true;
                        Finished(dbRoom.ID, true);
                    }
                    db.Cards.Update(dbCard);
                    db.Rooms.Update(dbRoom);
                    db.SaveChanges();
                    tran.Commit();
                    return ToModel(dbRoom);
                }
            }
        }

        public Room ChangeTurn(int id)
        {
            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == id);
            if (dbRoom == null)
            {
                return null;
            }
            else
            {
                using (var tran = db.Database.BeginTransaction(System.Data.IsolationLevel.RepeatableRead))
                {
                    dbRoom.BluesTurn = !dbRoom.BluesTurn;
                    db.Rooms.Update(dbRoom);
                    db.SaveChanges();
                    tran.Commit();
                    return ToModel(dbRoom);
                }
            }
        }

        public Room Start(int id)
        {
            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == id);
            if (dbRoom == null)
            {
                return null;
            }
            else
            {
                dbRoom.Started = true;
                db.Rooms.Update(dbRoom);
                db.SaveChanges();
                return ToModel(dbRoom);
            }
        }

        public IReadOnlyCollection<Card> GetCards(int id)
        {
            return db.Cards.Where(c => c.RoomId == id).Select(ToCard).ToList();
        }

        public IReadOnlyCollection<Player> GetPlayers(int id)
        {
            return db.Players.Where(p => p.RoomId == id).Select(ToPlayer).ToList();
        }

        public Player ChooseSide(PlayerSide value, int roomid, string userid)
        {
            var dbUser = db.Users.FirstOrDefault(u => u.Id == userid);
            var dbPlayer = db.Players.FirstOrDefault(p => p.RoomId == roomid && p.UserId == userid);
            if (dbPlayer == null)
            {
                var newRecord = new DbPlayer { RoomId = roomid, UserId = userid, IsBlue = value.IsBlue, IsSpy = value.IsSpy, UserName = dbUser.UserName };
                db.Players.Add(newRecord);
                db.SaveChanges();
                return new Player(newRecord.ID, newRecord.IsBlue, newRecord.IsSpy, newRecord.RoomId, newRecord.UserId, newRecord.UserName);
            }
            else
            {
                dbPlayer.IsBlue = value.IsBlue;
                dbPlayer.IsSpy = value.IsSpy;
                db.Players.Update(dbPlayer);
                db.SaveChanges();
                return new Player(dbPlayer.ID, dbPlayer.IsBlue, dbPlayer.IsSpy, dbPlayer.RoomId, dbPlayer.UserId, dbPlayer.UserName);
            }
        }

        public Room RobotSide(int roomid, PlayerSide side)
        {
            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == roomid);
            if (dbRoom != null)
            {
                if (side.IsBlue && side.IsSpy)
                {
                    dbRoom.BlueSpyRobot = !dbRoom.BlueSpyRobot;
                }
                if (side.IsBlue && !side.IsSpy)
                {
                    dbRoom.BluePlayerRobot = !dbRoom.BluePlayerRobot;
                }
                if (!side.IsBlue && side.IsSpy)
                {
                    dbRoom.RedSpyRobot = !dbRoom.RedSpyRobot;
                }
                if (!side.IsBlue && !side.IsSpy)
                {
                    dbRoom.RedPlayerRobot = !dbRoom.RedPlayerRobot;
                }
                db.Rooms.Update(dbRoom);
                db.SaveChanges();
                return ToModel(dbRoom);
            }
            else
            {
                return null;
            }
        }

        public bool CheckRobotTurn(int roomid)
        {
            var dbRoom = FindById(roomid);
            if (dbRoom.CurrentNumber == 0 && ((!dbRoom.BluesTurn && dbRoom.BlueSpyRobot) || dbRoom.BluesTurn && dbRoom.RedSpyRobot))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public MI.NewWord BlueSpyGenerate(int roomid)
        {
            var cards = GetCards(roomid);
            var blueCards = cards.Where(c => c.Color == 1 && !c.Revealed);
            var blueWords = new List<string>();
            foreach (var bc in blueCards)
            {
                blueWords.Add(bc.Word);
            }
            var redCards = cards.Where(c => c.Color > 1 && !c.Revealed);
            var redWords = new List<string>();
            foreach (var rc in redCards)
            {
                redWords.Add(rc.Word);
            }
            return MI_Test.Program.NewWord(blueWords, redWords);
        }

        public MI.NewWord RedSpyGenerate(int roomid)
        {
            var cards = GetCards(roomid);
            var blueCards = cards.Where(c => (c.Color == 1 || c.Color == 3) && !c.Revealed);
            var blueWords = new List<string>();
            foreach (var bc in blueCards)
            {
                blueWords.Add(bc.Word);
            }
            var redCards = cards.Where(c => c.Color == 2 && !c.Revealed);
            var redWords = new List<string>();
            foreach (var rc in redCards)
            {
                redWords.Add(rc.Word);
            }
            return MI_Test.Program.NewWord(redWords, blueWords);
        }
    }
}
