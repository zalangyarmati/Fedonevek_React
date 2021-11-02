using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MI_Test
{
    public class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Concrete(8);
                Console.ReadKey();
                Console.Clear();
            }

        }

        public static List<string> getWordList(string route){
            var WordList = new MI.WordList();
            var DataSet = DeserializeToObject<MI.DataSet>(route);
            foreach (MI.Stimulus s in DataSet.Stimuli)
            {
                if (s.Frequency > 90)
                {
                    WordList.Words.Add(s.Word);
                }
            }
            return WordList.Words;
        }
        public static int Generate(int frequency)
        {
            var rnd = new Random();
            var WordList = new MI.WordList();
            var DataSet = DeserializeToObject<MI.DataSet>("../../../dataset.xml");
            foreach (MI.Stimulus s in DataSet.Stimuli)
            {
                if (s.Frequency > frequency)
                {
                    WordList.Words.Add(s.Word);
                }
            }

            IEnumerable<string> randomized = WordList.Words.OrderBy(x => rnd.Next()).Take(8);
            IEnumerable<string> table = new List<string>(randomized);

            List<MI.Association> associations = new List<MI.Association>();

            foreach (MI.Stimulus s in DataSet.Stimuli)
            {
                if (table.Contains(s.Word))
                {
                    foreach (MI.Target t in s.Targets)
                    {
                        var ass = associations.Find(a => a.Clue == t.Word && a.Card == s.Word);
                        if (ass == null)
                        {
                            associations.Add(new MI.Association(t.Word, s.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in associations)
                            {
                                if (a.Clue == t.Word && a.Card == s.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
                foreach (MI.Target t in s.Targets)
                {
                    if (table.Contains(t.Word))
                    {
                        var ass = associations.Find(a => a.Clue == s.Word && a.Card == t.Word);
                        if (ass == null)
                        {
                            associations.Add(new MI.Association(s.Word, t.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in associations)
                            {
                                if (a.Clue == s.Word && a.Card == t.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
            }
            var grouped = associations.OrderBy(a => a.Clue)
                .GroupBy(a => a.Clue);
            var grouped2 = grouped.OrderByDescending(g => g.Count());

            int top = 0;
            int szum = 0;
            foreach (var grp in grouped2)
            {
                if (top < 10)
                {
                    top++;
                    szum += grp.Count();
                    Console.Write(" " + grp.Count() + " ");
                }
                //Console.WriteLine("{0} {1}", grp.Key, grp.Count());
            }
            Console.WriteLine("SUM: " + szum);
            return szum;
        }








        public static T DeserializeToObject<T>(string filepath) where T : class
        {
            System.Xml.Serialization.XmlSerializer ser = new System.Xml.Serialization.XmlSerializer(typeof(T));

            using (StreamReader sr = new StreamReader(filepath))
            {
                return (T)ser.Deserialize(sr);
            }
        }




        static void Concrete(int cardsCount)
        {
            var rnd = new Random();
            var WordList = new MI.WordList();
            var DataSet = DeserializeToObject<MI.DataSet>("../../../dataset.xml");
            foreach (MI.Stimulus s in DataSet.Stimuli)
            {
                if (s.Frequency > 90)
                {
                    WordList.Words.Add(s.Word);
                }
            }

            IEnumerable<string> randomized = WordList.Words.OrderBy(x => rnd.Next()).Take(cardsCount);
            IEnumerable<string> blueCards = new List<string>(randomized);
            IEnumerable<string> redCards = new List<string>(randomized);

            IEnumerable<string> cards = blueCards.Concat(redCards);

            List<MI.Association> associations = new List<MI.Association>();
            List<MI.Association> badAssociations = new List<MI.Association>();


            foreach (MI.Stimulus s in DataSet.Stimuli)
            {
                //Finding the good associations
                if (blueCards.Contains(s.Word))
                {
                    foreach (MI.Target t in s.Targets)
                    {
                        var ass = associations.Find(a => a.Clue == t.Word && a.Card == s.Word);
                        if (ass == null)
                        {
                            associations.Add(new MI.Association(t.Word, s.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in associations)
                            {
                                if (a.Clue == t.Word && a.Card == s.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
                foreach (MI.Target t in s.Targets)
                {
                    if (blueCards.Contains(t.Word))
                    {
                        var ass = associations.Find(a => a.Clue == s.Word && a.Card == t.Word);
                        if (ass == null)
                        {
                            associations.Add(new MI.Association(s.Word, t.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in associations)
                            {
                                if (a.Clue == s.Word && a.Card == t.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
                //Finding the bad associations
                if (redCards.Contains(s.Word))
                {
                    foreach (MI.Target t in s.Targets)
                    {
                        var ass = badAssociations.Find(a => a.Clue == t.Word && a.Card == s.Word);
                        if (ass == null)
                        {
                            badAssociations.Add(new MI.Association(t.Word, s.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in badAssociations)
                            {
                                if (a.Clue == t.Word && a.Card == s.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
                foreach (MI.Target t in s.Targets)
                {
                    if (redCards.Contains(t.Word))
                    {
                        var ass = badAssociations.Find(a => a.Clue == s.Word && a.Card == t.Word);
                        if (ass == null)
                        {
                            badAssociations.Add(new MI.Association(s.Word, t.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in badAssociations)
                            {
                                if (a.Clue == s.Word && a.Card == t.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
            }

            Console.WriteLine("Blue Cards: ");
            foreach (string t in blueCards)
            {
                Console.WriteLine(t);
            }
            Console.WriteLine("-------------------------------");
            Console.WriteLine("Red Cards: ");
            foreach (string t in redCards)
            {
                Console.WriteLine(t);
            }
            Console.WriteLine("-------------------------------");

            //Grouping good associations
            var grouped = associations
                .GroupBy(a => a.Clue)
                .Select(
                    a => new MI.AssociationGroup(a.Key, a.Count(), a.Sum(s => s.Strength), a.Select(s => s.Card))
                )
                .ToList()
                .OrderByDescending(g => g.Count)
                .ThenByDescending(g => g.Strength);


            var maximums = associations
                    .GroupBy(a => a.Card)
                    .Select(grp => new MI.AssociationGroup(
                        grp
                         .OrderByDescending(s => s.Strength)
                         .Select(x => x.Clue)
                         .FirstOrDefault(),
                        1,
                        grp
                         .OrderByDescending(s => s.Strength)
                         .Select(x => x.Strength)
                         .FirstOrDefault(),
                        (string)grp
                         .OrderByDescending(s => s.Strength)
                         .Select(x => x.Card)
                         .First().AsEnumerable()
                        )
                    );

            var topAssociations = grouped.Where(a => a.Count > 1);

            foreach(var a in topAssociations)
            {
                foreach (var b in badAssociations)
                {
                    if (a.Clue == b.Clue && b.Strength > (a.Strength / a.Count))
                    {
                        a.Strength = 0;
                    }
                }
            }

            var possibleguesses = topAssociations.Concat(maximums);

            foreach (var grp in possibleguesses)
            {
                Console.WriteLine("{0} {1} {2}", grp.Clue, grp.Count, grp.Strength);

                foreach (string s in grp.Cards)
                {
                    Console.WriteLine("\t-" + s);
                }
                var guesses = Guess(cards, grp.Clue, grp.Count);
                Console.WriteLine("Guesses: ");
                foreach (MI.Association ass in guesses)
                {
                    Console.WriteLine("\t\t-" + ass.Card);
                }


            }

            //Grouping bad associations
            var badGrouped = badAssociations
                .GroupBy(a => a.Clue)
                .Select(
                    a => new
                    {
                        Clue = a.Key,
                        Count = a.Count(),
                        Strength = a.Sum(s => s.Strength)
                    }
                )
                .ToList()
                .OrderByDescending(g => g.Count)
                .ThenByDescending(g => g.Strength);

            var topBadAssociations = badGrouped.Take(10);
            //foreach (var grp in topBadAssociations)
            //{
            //    Console.WriteLine("{0} {1} {2}", grp.Clue, grp.Count, grp.Strength);
            //}

            //Console.WriteLine("-------------------------------");

            List<MI.Association> SortedList = associations.OrderBy(a => a.Clue).ToList();
            foreach (MI.Association a in SortedList)
            {
                a.Print();
            }
            Console.ReadKey();
        }

        public static List<MI.Association> Guess(IEnumerable<string> cards, string clueWord, int count)
        {
            var DataSet = DeserializeToObject<MI.DataSet>("dataset.xml");
            List<MI.Association> associations = new List<MI.Association>();

            var cardsOnTale = DataSet.Stimuli.Where(s => cards.Contains(s.Word));

            foreach (MI.Stimulus s in cardsOnTale)
            {
                foreach (MI.Target t in s.Targets)
                {
                    if (t.Word == clueWord)
                    {
                        associations.Add(new MI.Association(clueWord, s.Word, t.Fsg));
                    }
                }
            }

            var guesses = new List<string>();
            foreach (MI.Association a in associations)
            {
                guesses.Add(a.Card);
            }


            var clueStimulus = DataSet.Stimuli.Where(s => s.Word == clueWord.ToUpper()).FirstOrDefault();
            if (clueStimulus != null)
            {
                foreach (MI.Target t in clueStimulus.Targets)
                {

                    if (cards.Contains(t.Word) && !guesses.Contains(t.Word))
                    {
                        associations.Add(new MI.Association(clueWord, t.Word, t.Fsg));
                    }
                }
            }

            return associations.OrderByDescending(a => a.Strength).Take(count).ToList();
        }

        public static MI.NewWord NewWord(IEnumerable<string> blueCards, IEnumerable<string> redCards)    
        {
            foreach(var c in blueCards)
            {
                Console.WriteLine(c);
            }
            var DataSet = DeserializeToObject<MI.DataSet>("dataset.xml");


            IEnumerable<string> cards = blueCards.Concat(redCards);
            List<MI.Association> associations = new List<MI.Association>();
            List<MI.Association> badAssociations = new List<MI.Association>();


            foreach (MI.Stimulus s in DataSet.Stimuli)
            {
                //Finding the good associations
                if (blueCards.Contains(s.Word))
                {
                    foreach (MI.Target t in s.Targets)
                    {
                        var ass = associations.Find(a => a.Clue == t.Word && a.Card == s.Word);
                        if (ass == null)
                        {
                            associations.Add(new MI.Association(t.Word, s.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in associations)
                            {
                                if (a.Clue == t.Word && a.Card == s.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
                foreach (MI.Target t in s.Targets)
                {
                    if (blueCards.Contains(t.Word))
                    {
                        var ass = associations.Find(a => a.Clue == s.Word && a.Card == t.Word);
                        if (ass == null)
                        {
                            associations.Add(new MI.Association(s.Word, t.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in associations)
                            {
                                if (a.Clue == s.Word && a.Card == t.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
                //Finding the bad associations
                if (redCards.Contains(s.Word))
                {
                    foreach (MI.Target t in s.Targets)
                    {
                        var ass = badAssociations.Find(a => a.Clue == t.Word && a.Card == s.Word);
                        if (ass == null)
                        {
                            badAssociations.Add(new MI.Association(t.Word, s.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in badAssociations)
                            {
                                if (a.Clue == t.Word && a.Card == s.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
                foreach (MI.Target t in s.Targets)
                {
                    if (redCards.Contains(t.Word))
                    {
                        var ass = badAssociations.Find(a => a.Clue == s.Word && a.Card == t.Word);
                        if (ass == null)
                        {
                            badAssociations.Add(new MI.Association(s.Word, t.Word, t.Fsg));
                        }
                        else
                        {
                            foreach (MI.Association a in badAssociations)
                            {
                                if (a.Clue == s.Word && a.Card == t.Word)
                                {
                                    a.Strength += t.Fsg;
                                }
                            }
                        }
                    }
                }
            }

            //Grouping good associations
            var grouped = associations
                .GroupBy(a => a.Clue)
                .Select(
                    a => new MI.AssociationGroup(a.Key, a.Count(), a.Sum(s => s.Strength), a.Select(s => s.Card))
                )
                .ToList()
                .OrderByDescending(g => g.Count)
                .ThenByDescending(g => g.Strength);


            var maximums = associations
                    .GroupBy(a => a.Card)
                    .Select(grp => new MI.AssociationGroup(
                        grp
                         .OrderByDescending(s => s.Strength)
                         .Select(x => x.Clue)
                         .FirstOrDefault(),
                        1,
                        grp
                         .OrderByDescending(s => s.Strength)
                         .Select(x => x.Strength)
                         .FirstOrDefault(),
                        (string)grp
                         .OrderByDescending(s => s.Strength)
                         .Select(x => x.Card)
                         .First().AsEnumerable()
                        )
                    );

            var topAssociations = grouped.Where(a => a.Count > 1);

            foreach(var a in topAssociations)
            {
                foreach (var b in badAssociations)
                {
                    if (a.Clue == b.Clue && b.Strength > (a.Strength / a.Count))
                    {
                        a.Strength = 0;
                    }
                }
            }

            var possibleguesses = topAssociations.Concat(maximums);
            var final = possibleguesses.Where(g => g.Strength > 0).First();

            return new MI.NewWord(final.Clue, final.Count);
        }




    }
}
