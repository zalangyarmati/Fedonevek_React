using Fedonevek_React.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly ApplicationDbContext db;

        public UsersRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<IReadOnlyCollection<ApplicationUser>> List()
        {
            return await db.Users.OrderByDescending(u => u.Point).Take(5).ToListAsync();
        }
    }
}
