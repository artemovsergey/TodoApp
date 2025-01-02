using Microsoft.EntityFrameworkCore;
using TodoApp.API.Models;

namespace TodoApp.API.Data;

public class TodoAppContext(DbContextOptions<TodoAppContext> opt) : DbContext(opt)
{
    public required DbSet<TaskEntity> Tasks {get; set;}
}