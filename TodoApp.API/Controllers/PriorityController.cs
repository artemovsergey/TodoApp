using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PriorityController(TodoAppContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Priority>>> GetPriorities(){
        return Ok(await db.Priorities.ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<Priority>> CreatePriority(Priority p){
        db.Priorities.Add(p);
        try
        {
           await db.SaveChangesAsync();
           return Created("",p);
        }
        catch (System.Exception ex)
        {
           throw new Exception($"{ex.InnerException?.Message}");
        }
    }

    [HttpPut]
    public async Task<ActionResult<Priority>> Update(Priority p){
        if(!await PriorityExist(p)) throw new Exception($"Нет такого приоритета с {p.Id}");
       
        db.Priorities.Update(p);

        try
        {
          await db.SaveChangesAsync();
          return Ok(p);
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException?.Message}");
        }

    }

    [HttpDelete]
    public async Task<ActionResult<bool>> DeletePriority(Priority p){
        if(!await PriorityExist(p)) throw new Exception($"Нет такого приоритета с {p.Id}");
       
        db.Priorities.Remove(p);
        try
        {
          await db.SaveChangesAsync();
          return Ok(true);
        }
        catch (System.Exception ex)
        {
            throw new Exception($"{ex.InnerException?.Message}");
        }
    }

    private async Task<bool> PriorityExist(Priority p){
        return await db.Priorities.AnyAsync(priority => priority.Id == p.Id) ? true : false;
    }
    
}