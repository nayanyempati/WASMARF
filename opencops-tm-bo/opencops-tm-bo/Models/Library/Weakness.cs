namespace opencops_tm_bo.Models.Library
{
    public class Weakness
    {
        public string howto_id { get; set; }
        public string universal_id { get; set; }
        public string title { get; set; }
        public string text { get; set; }
        public string countermeasure_title_read_only { get; set; }
        public string creat { get; set; }
        public string countermeasure { get; set; }
        public DateTime created { get; set; }
        public DateTime last_updated { get; set; }
        public bool custom { get; set; }
        public string rules { get; set; }
        public string rules_read_only { get; set; }
    }
}
