import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Task } from '../models/task';
import { Category } from '../models/category';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$ = new BehaviorSubject<Task[]>(TestData.tasks);

  constructor(){
    this.getTasks()
  }

  // все подписчики получают данные через метод next
  getTasks() {
    this.tasks$.next(TestData.tasks)
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks)
  }

  getTasksByCategory(category: Category){
    const tasks = TestData.tasks.filter(t => t.category?.id === category.id)
    this.tasks$.next(tasks)
  }

  
}
