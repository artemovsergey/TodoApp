import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from "./categories/categories.component";
import { TasksComponent } from "./tasks/tasks.component";
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { CommonModule } from '@angular/common';
import { TasksService } from '../services/tasks.service';
import { filter } from 'rxjs';
import { Task } from '../models/task';

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

  ngOnInit(): void {
    //this.categoryService.getAll().subscribe(r => this.categories = r)
    this.taskService.getAll().subscribe(r => this.tasks = r, e => console.log(e))
  }

  selectCategory(category: Category) {
    console.log(category)
    this.taskService.getTasksByCategory(category)
  }

}
