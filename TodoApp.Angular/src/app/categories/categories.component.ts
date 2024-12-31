import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
  
  public taskService = inject(TasksService)

  @Input()
  categories: Category[] | null = []

  @Output()
  selectCategory = new EventEmitter<Category | null>()

  emitCategory(category: Category | null) {
    //this.taskService.getTasksByCategory(category)
    this.selectCategory.emit(category)
  }

  ngOnInit(): void {
    // подписались на поток категорий или в шаблоне pipe async на поток
    //this.categoryService.categories$.subscribe(r => this.categories = r)
    
    // сервис загрузил в поток данные и отправил всем подписчикам или
    // можно применить behaviorsubject для инициализации начальных значений
    //this.categoryService.getCategories()
  }



}
