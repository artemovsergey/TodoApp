import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  
  private _liveAnnouncer = inject(LiveAnnouncer);
  public taskService = inject(TasksService)
  displayedColumns: string[] = ['color','number','title', 'category', 'priority', 'date', 'complete'];
  dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  private tasks!: Task[]
  @Input('tasks')
  set setTasks(tasks: Task[]){
    this.tasks = tasks;
    this.initializeDataSource();
    console.log("setter job ...")
  }

  @Output()
  taskEvent = new EventEmitter<Task>()

  emitTask(task: Task){
    this.taskEvent.emit(task)
  }

  constructor(){
    console.log("constructor ...")
  }

  ngOnInit() {
    console.log('init...')
    this.taskService.tasks$.subscribe(r => {
      this.dataSource.data = r;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("next .... ")
    })

  }

  private initializeDataSource(){
    this.dataSource.data = this.tasks
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    }, 0); 
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort; 
  // }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  taskComlete(task: Task) {
    task.complete = !task.complete
    console.log(`Статус задачи "${task.title}" изменен на ${task.complete}`)
  }

}
