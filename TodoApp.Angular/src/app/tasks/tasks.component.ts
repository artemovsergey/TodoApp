import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task';
import { TestData } from '../../data/testdata';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  public taskService = inject(TasksService)
  tasks: Task[] = TestData.tasks;
  
  ngOnInit(): void {
    this.taskService.tasks$.subscribe(r => this.tasks = r)
  }

}
