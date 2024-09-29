using GestoresAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace GestoresAPI.Context
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options ) : base(options)
        {
            
        }

        public DbSet<GestoresModel> gestores { get; set; }
    }
}
