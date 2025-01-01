import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryDialogComponent } from '../create-category-dialog/create-category-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  dialog = inject(MatDialog)
  categoryService = inject(CategoryService)

  public taskService = inject(TasksService)
  selectedCategory!: Category | null

  @Input()
  categories: Category[] | null = []

  @Output()
  selectCategory = new EventEmitter<Category | null>()

  emitCategory(category: Category | null) {
    //this.taskService.getTasksByCategory(category)
   
    //this.selectedCategory = category
    this.selectCategory.emit(category)
    this.categoryService.selectedCategory$.next(category)
  }

  ngOnInit(): void {
    // подписались на поток категорий или в шаблоне pipe async на поток
    //this.categoryService.categories$.subscribe(r => this.categories = r)
    
    // сервис загрузил в поток данные и отправил всем подписчикам или
    // можно применить behaviorsubject для инициализации начальных значений
    //this.categoryService.getCategories()
    this.categoryService.selectedCategory$.subscribe(r => {this.selectedCategory = r; console.log('Сработала подписка: ', r)})
   
  }

  editCategory() {
      // открываем диалог
      const dialogRef = this.dialog.open(
        EditCategoryDialogComponent,
        {data: [this.selectedCategory], autoFocus: true, width: '50%'}
      )
  
      // подписка на результат диалога
      dialogRef.afterClosed().subscribe(result => {
        if (result && result as Category){
          this.categoryService.update(result).subscribe(r => {console.log("Категория обновлена!")})
        }
      });
  }

  createCategory() {
    
    // открываем диалог
    const dialogRef = this.dialog.open(
      CreateCategoryDialogComponent,
      {data: [], autoFocus: true, width: '50%'}
    )

    // подписка на результат диалога
    dialogRef.afterClosed().subscribe(result => {
      if (result && result as Category){
        this.categoryService.create(result).subscribe(r => {console.log("Категория создана!")})
      }
    });

  } 


}
