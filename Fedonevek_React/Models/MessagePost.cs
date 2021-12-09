namespace Fedonevek_React.Models
{
    public class MessagePost
    {
        public int RoomID { get; set; }
        public virtual string Message { get; set; }
        public virtual string Sender { get; set; }
    }
}
