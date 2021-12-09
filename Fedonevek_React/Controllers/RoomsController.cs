using Fedonevek_React.Controllers.Dto;
using Fedonevek_React.Data;
using Fedonevek_React.Hubs;
using Fedonevek_React.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace Fedonevek_React.Controllers
{
    [Route("/api/rooms")]
    [ApiController]
    public class RoomsController : Controller
    {
        protected readonly IHubContext<GameHub> _gameHub;
        private readonly IRoomsRepository repository;
        private readonly LinkGenerator _generator;

        public RoomsController(IRoomsRepository repository, LinkGenerator generator, [NotNull] IHubContext<GameHub> gameHub)
        {
            _generator = generator;
            _gameHub = gameHub;
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<Room> List()
        {
            return repository.List();
        }

        [HttpGet("{id}", Name = nameof(Get))]
        public ActionResult<Room> Get(int id)
        {
            var value = repository.FindById(id);
            if (value == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(value);
            }
        }

        [HttpGet("{id}/cards", Name = nameof(GetCards))]
        public ActionResult<Card> GetCards(int id)
        {
            var value = repository.FindById(id);
            if (value == null)
            {
                return NotFound();
            }
            else
            {
                var cards = repository.GetCards(id);
                return Ok(cards);
            }
        }

        [HttpGet("{id}/players", Name = nameof(GetPlayers))]
        public ActionResult<Card> GetPlayers(int id)
        {
            var value = repository.FindById(id);
            if (value == null)
            {
                return NotFound();
            }
            else
            {
                var players = repository.GetPlayers(id);
                return Ok(players);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Room>> Create([FromBody] CreateRoom value)
        {
            var created = repository.Create(value);
            await _gameHub.Clients.All.SendAsync("roomcreated");
            return Ok(created);
        }

        [HttpPost("side/{roomid}/{userid}")]
        public async Task<ActionResult<Player>> ChooseSide([FromBody] PlayerSide value, int roomid, string userid)
        {
            var player = repository.ChooseSide(value, roomid, userid);
            await _gameHub.Clients.All.SendAsync("changeside", value, roomid, userid, player.UserName, player.ID);
            return Ok(player);
        }

        [HttpPost("side/robot/{roomid}/{userid}")]
        public async Task<ActionResult<Room>> RobotSide([FromBody] PlayerSide value, int roomid, string userid)
        {
            var room = repository.RobotSide(roomid, value);
            await _gameHub.Clients.All.SendAsync("robotside", value, roomid, userid);
            return Ok(room);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Room>> NewWord([FromBody] NewWord value)
        {
            var changed = repository.ChangeTurn(value.RoomID);
            var modified = repository.NewWord(value);
            await _gameHub.Clients.All.SendAsync("newWord", changed.ID, modified.CurrentWord, modified.CurrentNumber);
            CheckPlayerRobotTurn(modified);
            return Ok(modified);
        }

        [HttpPost("{id}/pass")]
        public async Task<ActionResult<Room>> Pass(int id)
        {
            var modified = repository.Pass(id);
            await _gameHub.Clients.All.SendAsync("reveal", modified.ID, id, modified.BlueScore, modified.RedScore, modified.CurrentNumber, modified.Finished);
            CheckSpyRobotTurn(modified);   
            return Ok(modified);
        }


        [HttpPost("{id}/reveal")]
        public async Task<ActionResult<Room>> RevealAsync(int? id)
        {
            var modified = repository.RevealOne(id);
            await _gameHub.Clients.All.SendAsync("reveal", modified.ID, id, modified.BlueScore, modified.RedScore, modified.CurrentNumber, modified.Finished);
            CheckSpyRobotTurn(modified);
            CheckPlayerRobotTurn(modified);
            return Ok(modified);
        }

        [HttpPost("{id}/change")]
        public ActionResult<Room> Change(int id)
        {
            var modified = repository.ChangeTurn(id);
            return Ok(modified);
        }

        [HttpPost("{id}/start")]
        public async Task<ActionResult<Room>> Start(int id)
        {
            var modified = repository.Start(id);
            await _gameHub.Clients.All.SendAsync("start", modified);
            CheckSpyRobotTurn(modified);
            return Ok(modified);
        }


        public void CheckSpyRobotTurn(Room room){
            if (repository.IsSpyRobotNext(room.ID))
            {
                MI.NewWord minw = new MI.NewWord();
                if (!room.BluesTurn)
                {
                    minw = repository.BlueSpyGenerate(room.ID);
                }
                else 
                {
                    minw = repository.RedSpyGenerate(room.ID);        
                }
                NewWord nw = new NewWord(room.ID, minw.Word, minw.Number);
                NewWord(nw);
            }
        }

        public void CheckPlayerRobotTurn(Room room){
            if (repository.IsPlayerRobotNext(room.ID))
            {
                int? id = repository.PlayerRobotGuess(room.ID);
                if (id != null)
                {
                    RevealAsync(id);
                }
                else
                {
                    Pass(room.ID);
                }
            }
        }

    }
}
