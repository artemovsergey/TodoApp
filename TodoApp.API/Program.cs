using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddDbContext<TodoAppContext>(o => o.UseSqlite(builder.Configuration.GetConnectionString("SQLite")));

builder.Services.AddCors();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.MapControllers();
app.Run();