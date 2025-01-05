import { inject, Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryRepository{

  http = inject(HttpClient)

  categoryCollection: Category[] = TestData.categories
  
  categories$ = new BehaviorSubject<Category[]>(this.categoryCollection)
  
  selectedCategory$ = new BehaviorSubject<Category | null>(null)

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/Category`)
  }

  getCategories(){
    this.categories$.next(this.categoryCollection)
  }

  get(id: number): Observable<Category> {
    throw new Error('Method not implemented.');
  }

  create(category: Category): Observable<Category> {
      return this.http.post<Category>(`${environment.baseUrl}/Category`,category)
  }

  del(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}/Category/${id}`)
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.baseUrl}/Category`, category)
  }

}
