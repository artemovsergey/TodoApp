import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryRepository{

  // создаем поток категорий
  categories$ = new BehaviorSubject<Category[]>(TestData.categories)

  getAll(): Observable<Category[]> {
    return of(TestData.categories)
  }

  getCategories(){
    const categories = TestData.categories;
    this.categories$.next(categories)
  }

  get(id: number): Observable<Category> {
    throw new Error('Method not implemented.');
  }

  create(object: Category): Observable<Category> {
    throw new Error('Method not implemented.');
  }

  del(id: number): boolean {
    throw new Error('Method not implemented.');
  }

  update(id: number, t: Category): Observable<Category> {
    throw new Error('Method not implemented.');
  }

}
