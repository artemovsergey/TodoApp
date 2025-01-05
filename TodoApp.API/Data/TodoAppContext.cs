using Microsoft.EntityFrameworkCore;
using TodoApp.API.Models;

namespace TodoApp.API.Data;

public class TodoAppContext(DbContextOptions<TodoAppContext> opt) : DbContext(opt)
{
    public required DbSet<TaskEntity> Tasks {get; set;}
    public required DbSet<Category> Categories {get; set;}
    public required DbSet<Priority> Priorities {get; set;}
}