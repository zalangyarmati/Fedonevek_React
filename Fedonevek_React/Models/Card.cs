﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Models
{
    public class Card
    {
        public Card(int id, string word, int position, bool revealed)
        {
            ID = id;
            Word = word;
            Position = position;
            Revealed = revealed;
        }
        public int ID { get; set; }
        public string Word { get; set; }
        public int Position { get; set; }
        public bool Revealed { get; set; }


    }
}
