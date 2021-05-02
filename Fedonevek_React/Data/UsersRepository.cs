using Fedonevek_React.Data.DbContext;
using Fedonevek_React.Models;
using Microsoft.EntityFrameworkCore;
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


        public IReadOnlyCollection<ApplicationUser> GetFriends(string id)
        {
            var records = db.Friends.Where(f => (f.userOne == id || f.userTwo == id)).ToList();
            List<ApplicationUser> friends = new List<ApplicationUser>();
            foreach (DbFriend f in records)
            {
                var friendID = "";
                if (f.userOne != id)
                    friendID = f.userOne;
                else
                {
                    friendID = f.userTwo;
                }
                var friend = db.Users.FirstOrDefault(u => u.Id == friendID);
                friends.Add(friend);
            }

            return (IReadOnlyCollection<ApplicationUser>)friends;
        }

        public DbFriend NewFriends(string id1, string id2)
        {
            bool alreadyFriends = false;
            var currentFriends = GetFriends(id1);
            foreach (ApplicationUser user in currentFriends)
            {
                if (user.Id == id2)
                {
                    alreadyFriends = true;
                }
            }

            if (!alreadyFriends)
            {
                var newRecord = new DbFriend { userOne = id1, userTwo = id2 };
                db.Friends.Add(newRecord);
                db.SaveChanges();
                return newRecord;
            }
            else
            {
                return null;
            }
        }
    }
}
