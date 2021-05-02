namespace Fedonevek_React.Models
{
    public class Player
    {
        public Player(int id, bool isblue, bool isspy, int roomid, string userid, string username)
        {
            ID = id;
            IsBlue = isblue;
            IsSpy = isspy;
            RoomId = roomid;
            UserId = userid;
            UserName = username;
        }
        public int ID { get; set; }
        public bool IsBlue { get; set; }
        public bool IsSpy { get; set; }
        public int RoomId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }

    }
}
