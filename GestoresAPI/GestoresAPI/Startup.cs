using GestoresAPI.Context;
using Microsoft.EntityFrameworkCore;

namespace GestoresAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        //This method gets called by the runtime. Use his method to add services to the container
        public void ConfigureServices(IServiceCollection services) { 
            services.AddControllers();
            services.AddDbContext<AppDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Conexion")));
        }

        //
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) { 
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { 
                endpoints.MapControllers();
            });
        }

    }
}
