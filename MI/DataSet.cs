using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace MI
{
    [XmlRoot(ElementName = "free-association-norms")]
    public class DataSet
    {
        [XmlElement(ElementName = "cue")]
        public List<Stimulus> Stimuli { get; set; }
    }
}
