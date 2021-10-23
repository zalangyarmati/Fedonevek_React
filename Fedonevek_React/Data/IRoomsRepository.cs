using Fedonevek_React.Controllers.Dto;
using Fedonevek_React.Models;
using System.Collections.Generic;

namespace Fedonevek_React.Data
{
    public interface IRoomsRepository
    {
        IReadOnlyCollection<Room> List();
        Room FindById(int roomid);
        Room Create(CreateRoom value);
        Room NewWord(NewWord value);
        Room Pass(int roomid);
        Room RevealOne(int cardId);
        Room ChangeTurn(int id);
        Room Start(int id);
        IReadOnlyCollection<Card> GetCards(int id);
        IReadOnlyCollection<Player> GetPlayers(int id);
        Player ChooseSide(PlayerSide value, int roomid, string userid);
        Room RobotSide(int roomid, PlayerSide side);
        bool IsSpyRobotNext(int roomid);
        bool IsPlayerRobotNext(int roomid);
        int? PlayerRobotGuess(int roomid);
        MI.NewWord BlueSpyGenerate(int roomid);
        MI.NewWord RedSpyGenerate(int roomid);

    }
}
