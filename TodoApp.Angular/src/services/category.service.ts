import { Injectable } from '@angular/core';
import { TestData } from '../data/testdata';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() { }

  getCategories(){
    return TestData.categories;
  }

}
