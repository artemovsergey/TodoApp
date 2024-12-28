import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';
import { Subject } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  // создаем поток категорий
  categories$ = new Subject<Category[]>()

  constructor(){
    console.log("Сервис Category создан!")
  }

  getCategories(){
    const categories = TestData.categories;
    this.categories$.next(categories)
  }

}
