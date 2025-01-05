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


  refresh() {
    // this.categories.push({id: 15, title: "2"})
    this.categories[0].title = "1"
  }



  tasks!: Task[];
  categories!: Category[];

  taskService = inject(TasksService)
  categoryService = inject(CategoryService)

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.taskService.getAll().subscribe(r => {this.tasks = r; 
                                              this.taskService.tasks$.next(r)})
    this.categoryService.getAll().subscribe(r => this.categories = r)
  }

  updateCategories() {
    this.categoryService.getAll().subscribe(r => this.categories = r)
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

      if (result !== undefined) {
        console.log("Результат: ", result)

        this.taskService.update(result).subscribe(
          next => {console.log("Update task"); this.loadData()  }
        )

      }
    });

  }

  selectCategory(category: Category | null) {
    console.log(category)
    // this.taskService.getTasksByCategory(category)
  }

}
