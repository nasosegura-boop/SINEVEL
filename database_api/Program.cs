using Microsoft.EntityFrameworkCore;
using SINEVEL.database_api.Data;
using SINEVEL.database_api.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Add services to the container
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Inyección de dependencias: el controlador recibe la interfaz, aquí se decide la implementación
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "database_api v1");
});
}


app.UseCors("ReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();