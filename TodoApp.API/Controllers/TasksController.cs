using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController(TodoAppContext db) : ControllerBase
{

    [HttpGet]
    [Route("/api/Category/{categoryId}/tasks")]
    public async Task<ActionResult<IEnumerable<TaskEntity>>> GetTasksByCategory(int categoryId){
        
        IQueryable<TaskEntity> tasks;

        if(categoryId != 0){
           tasks = db.Tasks.Include(t => t.Category).Include(t => t.Priority).Where(t => t.CategoryId == categoryId);
        }
        else{
           return await db.Tasks.Include(t => t.Category).Include(t => t.Priority).ToListAsync();
        }
        
        return await tasks.ToListAsync();
    }

    /// <summary>
    /// Вывод списка задач
    /// </summary>
    /// <returns> Коллекцию задач </returns>
    /// 
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskEntity>>> GetTasks(){
        return Ok(await db.Tasks.Include(t => t.Category).Include(t => t.Priority).ToListAsync());
    }

    /// <summary>
    /// Создание задачи
    /// </summary>
    /// <param name="t"> объект задачи TaskEntity</param>
    /// <returns> Код 201 и объект TaskEntity</returns>
    [HttpPost]
    public async Task<ActionResult<TaskEntity>> CreateTask(TaskEntity t){
        
        try
        {
           db.Tasks.Add(t);
           await db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
           throw new Exception($"{ex.InnerException?.Message}");
        } 

        return Created("",t);
    }

    /// <summary>
    /// Обновлене задачи
    /// </summary>
    /// <param name="t"></param>
    /// <returns></returns>
    
    [HttpPut]
    public async Task<ActionResult<TaskEntity>> PutTask(TaskEntity t){
        if(!await TaskExist(t.Id)) return NotFound($"Нет задачи с id = {t.Id}"); 
        db.Update(t);
        await db.SaveChangesAsync();
        return Ok(t);
    }

    /// <summary>
    /// Удаление задачи
    /// </summary>
    /// <param name="t"></param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteTask([FromRoute] int id){

        if(!await TaskExist(id)) return NotFound($"Нет задачи с id = {id}");
        var task = await db.Tasks.FindAsync(id);
        db.Tasks.Remove(task!);
        await db.SaveChangesAsync();

        return true; 
    }

    private async Task<bool> TaskExist(int taskId){
      return await db.Tasks.AnyAsync<TaskEntity>(e => e.Id == taskId) ? true : false;
    }
    
}