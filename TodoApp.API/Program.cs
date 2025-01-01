var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddCors();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(o => o.AllowAnyOrigin());
app.MapControllers();
app.Run();