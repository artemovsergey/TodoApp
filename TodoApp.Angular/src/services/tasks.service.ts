import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Task } from '../models/task';
import { Category } from '../models/category';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ITaskRepository } from '../interfaces/ITaskRepository';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements ITaskRepository {

  taskCollection: Task[] = TestData.tasks

  constructor(){
    console.log("taskService init ...")
  }

  // сервис отдает поток данных
  tasks$ = new BehaviorSubject<Task[]>(this.taskCollection);

  getAll(): Observable<Task[]> {
    return this.tasks$
  }
  
  delete(t:Task){
    this.taskCollection = this.taskCollection.filter(item => item.id !== t.id)
    this.tasks$.next(this.taskCollection)
  }

  getTasksByCategory(category: Category | null){
    if(category == null){
      this.tasks$.next(this.taskCollection)
      return
    }
    // имитация удаления
    const tasks = this.taskCollection.filter(t => t.category?.id === category.id)
    this.tasks$.next(tasks)
  }

  get(id: number): Observable<Task> {
    throw new Error('Method not implemented.');
  }

  create(object: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }

  del(id: number): boolean {
    throw new Error('Method not implemented.');
  }

  update(id: number, t: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }

  
}
