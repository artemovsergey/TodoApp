import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from "./categories/categories.component";
import { TasksComponent } from "./tasks/tasks.component";
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { CommonModule } from '@angular/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CategoriesComponent, TasksComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  categories!: Category[];
  tasks!: Task[];

  categoryService = inject(CategoryService)
  taskService = inject(TasksService)
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.taskService.getAll().subscribe(r => this.tasks = r)
  }

  showTask($event: Task) {
    console.log($event.title)
    this.openDialog($event)
  }

  openDialog(task: Task): void {

    // открытие окна
    const dialogRef = this.dialog.open(
      EditTaskDialogComponent,
      {data: [task], autoFocus: true, width: '50%'}  // конфигурация
    );

    // что делать после закрытия окна
    dialogRef.afterClosed().subscribe(result => {

      console.log('Диалог закрыт...');

      if (result !== undefined) {
        console.log("Результат: ", result)
      }
    });

  }

  selectCategory(category: Category | null) {
    console.log(category)
    this.taskService.getTasksByCategory(category)
  }

}
