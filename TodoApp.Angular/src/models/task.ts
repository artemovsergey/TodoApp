import { IBase } from "./base";
import { Category } from "./category";
import { Priority } from "./priority";

export interface Task extends IBase {
    title: string,
    complete: boolean,   
    category?: Category,
    priority?: Priority,
    date?: Date
}
