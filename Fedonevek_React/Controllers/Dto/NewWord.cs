using System.ComponentModel.DataAnnotations;

namespace Fedonevek_React.Controllers.Dto
{
    public class NewWord
    {
        [Required]
        public int RoomID { get; set; }
        [Required]
        public string Word { get; set; }
        [Required]
        public int Number { get; set; }

    }
}
