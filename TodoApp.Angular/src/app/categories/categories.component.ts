import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { TasksService } from '../../services/tasks.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  
  public categoryService = inject(CategoryService)
  public taskService = inject(TasksService)

  categories: Category[] = []

  constructor(){
    console.log("CategoryComponent создан!")
  }


  showTasksByCategory(category: Category) {
    this.taskService.getTasksByCategory(category)
  }

  showCategories(category: Category) {
    console.log(category)
  }

  ngOnInit(): void {
    // подписались на поток категорий
    this.categoryService.categories$.subscribe(r => this.categories = r)
    // сервис загрузил в поток данные и отправил всем подписчикам
    this.categoryService.getCategories()
  }



}
