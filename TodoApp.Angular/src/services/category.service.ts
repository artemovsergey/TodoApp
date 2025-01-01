import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryRepository{

  categoryCollection: Category[] = TestData.categories
  categories$ = new BehaviorSubject<Category[]>(this.categoryCollection)
  selectedCategory$ = new BehaviorSubject<Category | null>(null)

  getAll(): Observable<Category[]> {
    return this.categories$ //of(this.categoryCollection)
  }

  getCategories(){
    this.categories$.next(this.categoryCollection)
  }

  get(id: number): Observable<Category> {
    throw new Error('Method not implemented.');
  }

  create(category: Category): Observable<Category> {
    this.categoryCollection.push(category)
    this.categories$.next(this.categoryCollection)
    return of(category)
  }

  del(id: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  update(category: Category): Observable<Category> {

    var currentCategory = this.categoryCollection.find(c => c.id == category.id)
    if(!currentCategory) return of(category)

    this.categoryCollection.splice(this.categoryCollection.indexOf(currentCategory!),1,category)    
    // currentCategory!.title = category.title

    this.categories$.next(this.categoryCollection)
    return of(currentCategory)
  }

}
