using Fedonevek_React.Data.DbContext;
using Fedonevek_React.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public interface IUsersRepository
    {
        IReadOnlyCollection<ApplicationUser> GetFriends(string id);
        Task<IReadOnlyCollection<ApplicationUser>> List();
        DbFriend NewFriends(string id1, string id2);
    }
}
