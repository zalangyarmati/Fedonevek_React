using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Models
{
    public class Card
    {
        public int ID { get; set; }
        public string Word { get; set; }
        public int Position { get; set; }
        public bool Revealed { get; set; }


        public int RoomID { get; set; }
        public Room Room { get; set; }

    }
}
