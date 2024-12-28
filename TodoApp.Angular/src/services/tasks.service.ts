import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Task } from '../models/task';
import { Category } from '../models/category';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$ = new Subject<Task[]>();

  // все подписчики получают данные через метод next
  getTasks() {
    this.tasks$.next(TestData.tasks)
  }

  getTasksByCategory(category: Category){
    const tasks = TestData.tasks.filter(t => t.category?.id === category.id)
    this.tasks$.next(tasks)
  }

  
}
