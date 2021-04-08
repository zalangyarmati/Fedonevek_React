using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public class DbCard
    {
        public int ID { get; set; }
        public string Word { get; set; }
        public int Position { get; set; }
        public bool Revealed { get; set; }
        public int Color { get; set; }


        public int RoomId { get; set; }
        public DbRoom Room { get; set; }

    }
}
