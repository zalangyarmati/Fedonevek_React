using Fedonevek_React.Controllers.Dto;
using Fedonevek_React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public interface IRoomsRepository
    {
        IReadOnlyCollection<Room> List();
        Room FindById(int roomid);
        Room Create(CreateRoom value);
        Room NewWord(NewWord value);
    }
}
