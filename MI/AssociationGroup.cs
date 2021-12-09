using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MI
{
    public class AssociationGroup
    {
        public AssociationGroup(string _clue, int _count, float _strength, IEnumerable<string> _cards)
        {
            Clue = _clue;
            Count = _count;
            Strength = _strength;
            Cards = _cards;
        }

        public AssociationGroup(string _clue, int _count, float _strength, string _card)
        {
            Clue = _clue;
            Count = _count;
            Strength = _strength;
            Cards = new List<string>() { _card };
        }
        public string Clue { get; set; }
        public int Count { get; set; }
        public float Strength { get; set; }
        public IEnumerable<string> Cards { get; set; }
    }
}
