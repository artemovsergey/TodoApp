using Microsoft.EntityFrameworkCore;

namespace TodoApp.API.Models;

public abstract class Base{
    public int Id { get; set; }
    public required string Title {get; set;}
}


public class TaskEntity : Base
{
    public DateTime Date {get; set;} = DateTime.UtcNow;

        
    public int? CategoryId {get; set; }
    
    // [DeleteBehavior(DeleteBehavior.ClientSetNull)]
    public Category? Category {get; set;}


    public int? PriorityId {get ; set;}

    // [DeleteBehavior(DeleteBehavior.ClientSetNull)]
    public Priority? Priority {get ;set;}

    public bool Complete {get; set; } = false;

}

public class Category : Base
{

}

public class Priority : Base
{
    public string Color {get ; set;} = "#fff";
}