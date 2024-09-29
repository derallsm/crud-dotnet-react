using System.ComponentModel.DataAnnotations;

namespace GestoresAPI.Models
{
    public class GestoresModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public int Lanzamiento { get; set; }
        [Required]
        public string Desarrollador { get; set; }
    }
}
