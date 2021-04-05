using Fedonevek_React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public class CardsRepository : ICardsRepository
    {
        private readonly ApplicationDbContext db;

        public CardsRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public IReadOnlyCollection<Card> List(int id)
        {
            throw new NotImplementedException();
        }
    }
}
