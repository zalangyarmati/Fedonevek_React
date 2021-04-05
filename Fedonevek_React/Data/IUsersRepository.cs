using Fedonevek_React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public interface IUsersRepository
    {
        Task<IReadOnlyCollection<ApplicationUser>> List();
    }
}
