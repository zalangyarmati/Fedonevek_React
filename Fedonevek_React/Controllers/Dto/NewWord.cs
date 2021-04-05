using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
