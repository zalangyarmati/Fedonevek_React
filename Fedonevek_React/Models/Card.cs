namespace Fedonevek_React.Models
{
    public class Card
    {
        public Card(int id, string word, int position, bool revealed, int color)
        {
            ID = id;
            Word = word;
            Position = position;
            Revealed = revealed;
            Color = color;
        }
        public int ID { get; set; }
        public string Word { get; set; }
        public int Position { get; set; }
        public bool Revealed { get; set; }

        public int Color { get; set; }
    }
}
