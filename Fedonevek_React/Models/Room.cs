﻿namespace Fedonevek_React.Models
{
    public class Room
    {
        public Room(int id, string name, string word, int number, bool turn, bool finished, bool started, int bluescore, int redscore)
        {
            ID = id;
            Name = name;
            CurrentWord = word;
            CurrentNumber = number;
            BluesTurn = turn;
            Finished = finished;
            Started = started;
            BlueScore = bluescore;
            RedScore = redscore;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string CurrentWord { get; set; }
        public int CurrentNumber { get; set; }
        public bool BluesTurn { get; set; }
        public bool Finished { get; set; }

        public bool Started { get; set; }

        public int BlueScore { get; set; }
        public int RedScore { get; set; }

    }
}
