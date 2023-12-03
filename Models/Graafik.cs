using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Shop.Models
{
    public class Graafik
    {
        public int Id { get; set; }
        public string Paev { get; set; }
        public string AvatudAeg { get; set; }
        public string SuletudAeg { get; set; }
        public int PoodId { get; set; }

    }
}
