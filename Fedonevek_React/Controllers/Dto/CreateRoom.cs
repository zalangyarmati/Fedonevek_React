using System.ComponentModel.DataAnnotations;

namespace Fedonevek_React.Controllers.Dto
{
    public class CreateRoom
    {
        [Required]
        public string Name { get; set; }

    }
}
