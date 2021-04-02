using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Models
{
    public class Room
    {
        public int ID { get; set; }

        public string CurrentWord { get; set; }
        public int CurrentNumber { get; set; }
        public bool BluesTurn { get; set; }
        public bool Finished { get; set; }


        public ICollection<Card> Cards { get; set; }
    }
}
