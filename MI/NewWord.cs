namespace MI
{
    public class NewWord
    {
        public NewWord(){}
        public NewWord(string word, int number){
            this.Word = word;
            this.Number = number;
        }
        public string Word { get; set; }
        public int Number { get; set; }

    }
}