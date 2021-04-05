using Fedonevek_React.Controllers.Dto;
using Fedonevek_React.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return new Room(value.ID, value.Name, value.CurrentWord, value.CurrentNumber, value.BluesTurn, value.Finished, value.Started);
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
            var dbRoom =  db.Rooms.FirstOrDefault(r => r.ID == id);
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

            var newRecord = new DbRoom { Name = value.Name, Started = false, Finished = false };
            db.Rooms.Add(newRecord);
            db.SaveChanges();

            var wordList = db.Words.Select(ToWord).ToList();

            var rand = new Random();
            List<int> intList = new List<int>();
            while (intList.Count < 25)
            {
                int number = rand.Next(0, wordList.Count());
                if(intList.Contains(number) == false)
                {
                    intList.Add(number);
                }
            }

            int position = 1;

            //tranzakcióba
            foreach (int number in intList)
            {
                var newCard = new DbCard { Position = position, Revealed = false, RoomId = newRecord.ID, Word = wordList[number].Keyword };
                db.Cards.Add(newCard);
                db.SaveChanges();
                position++;
            }

            return new Room(newRecord.ID, newRecord.Name, newRecord.CurrentWord, newRecord.CurrentNumber, newRecord.BluesTurn, newRecord.Finished, newRecord.Started);
        }

        public Room NewWord(NewWord value)
        {
            var dbRoom = db.Rooms.FirstOrDefault(r => r.ID == value.RoomID);
            if(dbRoom == null)
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

        public Room RevealOne(int id)
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
                    dbRoom.CurrentNumber -= 1;
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
    }
}
