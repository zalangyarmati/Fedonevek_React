﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Models
{
    public class Word
    {
        public Word(int id, string keyword)
        {
            ID = id;
            Keyword = keyword;
        }
        public int ID { get; set; }
        public string Keyword { get; set; }
    }
}
