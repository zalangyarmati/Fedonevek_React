using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string NickName { get; set; }
        public int Point { get; set; }
        public int RoomID { get; set; }
        public bool Blue { get; set; }
        public bool Spy { get; set; }
    }
}
