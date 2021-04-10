﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Models
{
    public class Player
    {
        public Player(int id, bool isblue, bool isspy, int roomid, string userid)
        {
            ID = id;
            IsBlue = isblue;
            IsSpy = isspy;
            RoomId = roomid;
            UserId = userid;
        }
        public int ID { get; set; }
        public bool IsBlue { get; set; }
        public bool IsSpy { get; set; }
        public int RoomId { get; set; }
        public string UserId { get; set; }
    }
}
