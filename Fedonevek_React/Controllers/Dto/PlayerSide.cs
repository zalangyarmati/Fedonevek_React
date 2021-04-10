using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
