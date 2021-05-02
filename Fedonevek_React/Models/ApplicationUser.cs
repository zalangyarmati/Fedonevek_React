using Microsoft.AspNetCore.Identity;

namespace Fedonevek_React.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() { }
        public ApplicationUser(string nickname, int point)
        {
            NickName = nickname;
            Point = point;
        }

        public ApplicationUser(string username, string email, string nickname)
        {
            UserName = username;
            Email = email;
            NickName = nickname;
        }

        public string NickName { get; set; }
        public int Point { get; set; }

    }
}
