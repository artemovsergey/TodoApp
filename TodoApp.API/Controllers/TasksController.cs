using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController(TodoAppContext db) : ControllerBase
{
    private List<TaskEntity> Tasks {get ;set;} = new List<TaskEntity>(){
        new TaskEntity(){ Id = 1, Title = "Task1", CategoryId = 1, PriorityId = 1},
        new TaskEntity(){ Id = 2, Title = "Task1", CategoryId = 2, PriorityId = 2},
        new TaskEntity(){ Id = 3, Title = "Task1", CategoryId = 3, PriorityId = 3}
    };

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskEntity>>> GetTasks(){
        
        var tasksFromDb = await db.Tasks.ToListAsync();
        foreach (var t in tasksFromDb)
        {
           Tasks.Add(t);
        }

        return Ok(Tasks);
    }
    
}