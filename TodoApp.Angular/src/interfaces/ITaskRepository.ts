import { Observable } from "rxjs";
import { Task } from "../models/task";
import { IRepository } from "./IRepository";

export interface ITaskRepository extends IRepository<Task>{
    getTasksByCategory(categoryId: number): Observable<Task[]>
}