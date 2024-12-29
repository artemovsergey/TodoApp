import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task';
import { TestData } from '../../data/testdata';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  public taskService = inject(TasksService)
  tasks: Task[] = []
  
  ngOnInit(): void {
    this.taskService.tasks$.subscribe(r => this.tasks = r)
  }

  taskComlete(task: Task) {
    task.complete = !task.complete
    console.log(`Статус задачи "${task.title}" изменен на ${task.complete}`)
  }

}
