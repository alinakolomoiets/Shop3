using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Shop.Models
{
    public class Graafik
    {
        public int Id { get; set; }
        public DayOfWeek Paev { get; set; }
        public DateTime AvatudAeg { get; set; }
        public DateTime SuletudAeg { get; set; }

    }
}
