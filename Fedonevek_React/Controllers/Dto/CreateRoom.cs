using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Controllers.Dto
{
    public class CreateRoom
    {
        [Required]
        public string Name { get; set; }

    }
}
