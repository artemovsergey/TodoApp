import { IBase } from "./base";
import { Category } from "./category";
import { Priority } from "./priority";

export interface Task extends IBase {
    title: string,
    complete: boolean,

    categoryId?: number,   
    category?: Category,

    priority?: Priority,
    priorityId?: number,
    
    date?: Date
}
