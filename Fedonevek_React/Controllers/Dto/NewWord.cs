using System.ComponentModel.DataAnnotations;

namespace Fedonevek_React.Controllers.Dto
{
    public class NewWord
    {
        public NewWord(int roomid, string word, int number){
            this.RoomID = roomid;
            this.Word = word;
            this.Number = number;
        }
        [Required]
        public int RoomID { get; set; }
        [Required]
        public string Word { get; set; }
        [Required]
        public int Number { get; set; }

    }
}
