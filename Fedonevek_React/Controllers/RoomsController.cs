using Fedonevek_React.Controllers.Dto;
using Fedonevek_React.Data;
using Fedonevek_React.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Controllers
{
    [Route("/api/rooms")]
    [ApiController]
    public class RoomsController : Controller
    {
        private readonly IRoomsRepository repository;

        public RoomsController(IRoomsRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<Room> List()
        {
            return repository.List();
        }

        [HttpGet("{id}")]
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

        [HttpPost]
        public ActionResult<Room> Create([FromBody] CreateRoom value)
        {
            var created = repository.Create(value);
            return Ok(created);
        }

        [HttpPost("{id}")]
        public ActionResult<Room> NewWord([FromBody] NewWord value)
        {
            var modified = repository.NewWord(value);
            return Ok(modified);
        }

        [HttpPost("{id}/reveal")]
        public ActionResult<Room> Reveal(int id)
        {
            var modified = repository.RevealOne(id);
            return Ok(modified);
        }

        [HttpPost("{id}/change")]
        public ActionResult<Room> Change(int id)
        {
            var modified = repository.ChangeTurn(id);
            return Ok(modified);
        }

    }
}
