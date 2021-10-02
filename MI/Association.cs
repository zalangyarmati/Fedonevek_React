using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MI
{
    public class Association
    {
        public Association(string _clue, string _card, float _strength)
        {
            Clue = _clue;
            Card = _card;
            Strength = _strength;
        }
        public string Clue { get; set; }
        public string Card { get; set; }
        public float Strength { get; set; }

        public void Print()
        {
            Console.WriteLine("\t--------");
            Console.WriteLine("\tClue: " + Clue);
            Console.WriteLine("\tCard: " + Card);
            Console.WriteLine("\tStrength: " + Strength);
        }
    }
}
