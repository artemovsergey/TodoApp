import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Subject, BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  // создаем поток категорий
  categories$ = new BehaviorSubject<Category[]>(TestData.categories)

  constructor(){
    console.log("Сервис Category создан!")
  }

  getCategories(){
    const categories = TestData.categories;
    this.categories$.next(categories)
  }

}
