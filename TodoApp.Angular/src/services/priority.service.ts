import { inject, Injectable } from '@angular/core';
import { IPriorityRepository } from '../interfaces/IPriorityRepository';
import { Observable } from 'rxjs';
import { Priority } from '../models/priority';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PriorityService implements IPriorityRepository {

  http = inject(HttpClient)

  getAll(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${environment.baseUrl}/priority`)
  }

  get(id: number): Observable<Priority> {
    throw new Error('Method not implemented.');
  }
  create(object: Priority): Observable<Priority> {
    throw new Error('Method not implemented.');
  }
  del(id: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  update(t: Priority): Observable<Priority> {
    throw new Error('Method not implemented.');
  }

}
