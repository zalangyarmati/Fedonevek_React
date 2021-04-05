using Fedonevek_React.Data;
using Fedonevek_React.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
