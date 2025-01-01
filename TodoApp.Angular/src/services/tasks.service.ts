import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements ITaskRepository {

  http = inject(HttpClient)

  // сервис отдает поток данных
  tasks$ = new BehaviorSubject<Task[]>([]);

  getTasksByCategory(categoryId: number): Observable<Task[]>{
    return this.http.get<Task[]>(`${environment.baseUrl}/category/${categoryId}/tasks`)
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}/tasks`)
    //return this.http.get<Task[]>('testdata.json')
  }

  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.baseUrl}/tasks/${id}`)
  }

  create(t: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.baseUrl}/tasks`, t, this.generateHeaders())
  }

  del(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}/tasks/${id}`)
  }

  update(t: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.baseUrl}/tasks`, t, this.generateHeaders())
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  
}
