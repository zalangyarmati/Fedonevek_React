using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace MI
{
    [XmlRoot(ElementName = "target")]
    public class Target
    {
        [XmlAttribute("word")]
        public string Word { get; set; }

        [XmlAttribute("g")]
        public int G { get; set; }

        [XmlAttribute("p")]
        public int P { get; set; }

        [XmlAttribute("fsg")]
        public float Fsg { get; set; }

        [XmlAttribute("fr")]
        public int Fr { get; set; }

        [XmlAttribute("pos")]
        public string Pos { get; set; }

        [XmlAttribute("con")]
        public float Con { get; set; }

        public void Print()
        {
            Console.WriteLine("\t--------");
            Console.WriteLine("\tWord: " + Word);
            Console.WriteLine("\tG: " + G);
            Console.WriteLine("\tP: " + P);
            Console.WriteLine("\tFsg: " + Fsg);
            Console.WriteLine("\tFr: " + Fr);
            Console.WriteLine("\tPos: " + Pos);
            Console.WriteLine("\tCon: " + Con);
        }
    }
}
