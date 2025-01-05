using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController(TodoAppContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories(){

        return Ok(await db.Categories.ToListAsync<Category>());
    }

    /// <summary>
    /// Создание категории
    /// </summary>
    /// <param name="c"></param>
    /// <returns></returns> <summary>
    /// 
    /// </summary>
    /// <param name="c"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(Category c){

        try
        {
            db.Categories.Add(c);
            await db.SaveChangesAsync();
            // Todo Написать в лог
        }
        catch (Exception ex)
        {
            throw new Exception($"{ex.InnerException?.Message}");
        }

        return Created("",c);
    }

    /// <summary>
    /// Обновление категории
    /// </summary>
    /// <param name="c"></param>
    /// <returns></returns>
    [HttpPut]
    public async Task<ActionResult<Category>> PutCategory(Category c)
    {

        if (await CategoryExist(c.Id) == null) return NotFound($"Нет категории с id = {c.Id}");

        // Update не проеряет существование объекта в контексте
        db.Categories.Update(c);

        //Этот подход более безопасен, так как он не пытается обновлять несуществующий объект или связанные с ним объекты.
        //db.Entry(c).CurrentValues.SetValues(c);

        try
        {
            await db.SaveChangesAsync();
            //Todo Написать в лог
        }
        catch (System.Exception ex)
        {
            throw new Exception($"Ошибка: {ex.InnerException?.Message}");
        }

        return c;
    }

    /// <summary>
    /// Удаление категории
    /// </summary>
    /// <param name="c"></param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteCategory(int id){
        
        if(await CategoryExist(id) == null) return NotFound($"Нет категории с id = {id}");
        db.Remove(await CategoryExist(id));
        
        try
        {
            await db.SaveChangesAsync();
            //Todo Написать в лог
        }
        catch (System.Exception ex)
        {
            throw new Exception(ex.InnerException?.Message);
        }

        return true;   

    }

    private async Task<Category> CategoryExist(int categoryId){
        // не отслеживать объект AsNoTracking<Category>()
        var category = await db.Categories.AsNoTracking<Category>().Where(r => r.Id == categoryId).FirstOrDefaultAsync();
        return category!;
    }

}