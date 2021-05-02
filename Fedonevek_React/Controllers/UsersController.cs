using Fedonevek_React.Data;
using Fedonevek_React.Data.DbContext;
using Fedonevek_React.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fedonevek_React.Controllers
{
    [Route("/api/users")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUsersRepository repository;

        public UsersController(IUsersRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<ApplicationUser>> List()
        {
            return await repository.List();
        }

        [HttpGet("friends/{id}")]
        public IEnumerable<ApplicationUser> GetFriends(string id)
        {
            return repository.GetFriends(id);
        }

        [HttpPost("friends/new/{id1}/{id2}")]
        public ActionResult<DbFriend> NewFriends(string id1, string id2)
        {
            var friendsRecord = repository.NewFriends(id1, id2);
            if (friendsRecord == null)
            {
                return null;
            }
            else
            {
                return Ok(friendsRecord);
            }
        }
    }
}
