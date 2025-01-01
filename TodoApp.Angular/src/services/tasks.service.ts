import { inject, Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Task } from '../models/task';
import { Category } from '../models/category';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements ITaskRepository {

  taskCollection: Task[] = TestData.tasks
  categoryService = inject(CategoryService)

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

    this.categoryService.selectedCategory$.next(category)

    if(category == null){
      console.log('Пришел null!')
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
    this.taskCollection.push(object)
    this.tasks$.next(this.taskCollection)
    return of(object)
  }

  del(id: number): boolean {
    throw new Error('Method not implemented.');
  }

  update(task: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }

  
}
