using Fedonevek_React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public class DbPlayer
    {
        public int ID { get; set; }
        public bool IsBlue { get; set; }
        public bool IsSpy { get; set; }
        public int RoomId { get; set; }
        public DbRoom Room { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
