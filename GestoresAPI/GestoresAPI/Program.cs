


using GestoresAPI.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder => {
        builder.WithOrigins("https://localhost:3000", "https://localhost:44385")
               .AllowAnyOrigin()
               .AllowAnyHeader();
    });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDBContext>(options =>
{
    //options.UseSqlServer("Server=(localdb)\\LocalServer; Database=CRUD-React; Integrated Security=True;Encrypt=True;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False; MultipleActiveResultSets=true");
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
