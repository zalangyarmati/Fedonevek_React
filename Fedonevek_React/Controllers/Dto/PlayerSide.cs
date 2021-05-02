using System.ComponentModel.DataAnnotations;

namespace Fedonevek_React.Controllers.Dto
{
    public class PlayerSide
    {
        [Required]
        public bool IsBlue { get; set; }
        [Required]
        public bool IsSpy { get; set; }
    }
}
