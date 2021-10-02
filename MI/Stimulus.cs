using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace MI
{
    [XmlRoot(ElementName = "cue")]
    public class Stimulus
    {
        [XmlAttribute("word")]
        public string Word { get; set; }
        [XmlAttribute("fr")]
        public int Frequency { get; set; }
        [XmlAttribute("pos")]
        public string Position { get; set; }

        [XmlAttribute("con")]
        public float Con { get; set; }

        [XmlElement(ElementName = "target")]
        public List<Target> Targets { get; set; }

        public void Print()
        {
            Console.WriteLine("--------");
            Console.WriteLine("Word: " + Word);
            Console.WriteLine("Frequency: " + Frequency);
            Console.WriteLine("Position: " + Position);
            Console.WriteLine("Con: " + Con);
            foreach(Target t in Targets)
            {
                t.Print();
            }
        }
    }
}
