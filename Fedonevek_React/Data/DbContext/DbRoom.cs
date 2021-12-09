using System.Collections.Generic;

namespace Fedonevek_React.Data
{
    public class DbRoom
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string CurrentWord { get; set; }
        public int CurrentNumber { get; set; }
        public bool BluesTurn { get; set; }
        public bool Finished { get; set; }
        public bool Started { get; set; }
        public ICollection<DbCard> Cards { get; set; }
        public ICollection<DbPlayer> Players { get; set; }
        public int BlueScore { get; set; }
        public int RedScore { get; set; }
        public bool BluePlayerRobot { get; set; }
        public bool BlueSpyRobot { get; set; }
        public bool RedPlayerRobot { get; set; }
        public bool RedSpyRobot { get; set; }
    }

}
