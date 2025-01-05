import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteTaskDialogComponent } from '../confirm-delete-task-dialog/confirm-delete-task-dialog.component';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskdatePipe } from '../../pipes/taskdate.pipe';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskdatePipe, MatCheckboxModule, MatIconModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  
  getTasksByCategory(category: Category) {
    this.taskService.getTasksByCategory(category?.id ?? 0).subscribe(
      tasks => {this.taskService.tasks$.next(tasks); console.log("! ",tasks)}
    )

    this.categoryService.selectedCategory$.next(category)
  }

  taskService = inject(TasksService)
  categoryService = inject(CategoryService)
  _liveAnnouncer = inject(LiveAnnouncer);
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['number','color','title', 'category', 'priority', 'date', 'complete','delete'];
  dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatTable, {static: false}) table!: MatTable<Task>;

  // private tasks!: Task[]
  // @Input('tasks')
  // set setTasks(tasks: Task[]){
  //   this.tasks = tasks;
  //   this.initializeDataSource();
  //   console.log(this.tasks)
  // }

  @Output() taskEvent = new EventEmitter<Task>()

  ngOnInit() {
    this.taskService.getAll().subscribe(r => {
      this.taskService.tasks$.next(r)
    })

    this.loadData()
    
    console.log("onInit...")
  }

  loadData(){
    this.taskService.tasks$.subscribe(r => {
      this.dataSource.data = r;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("next .... ")
    })
  }

  emitTask(task: Task){
    this.taskEvent.emit(task)
  }

  // private initializeDataSource(){
  //   this.dataSource.data = this.tasks
  //   setTimeout(() => {
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.table.renderRows();
  //   }, 0); 
  // }

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

  deleteTask(task: Task) {

      const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
      buttonElement.blur(); // Remove focus from the button
      // открытие окна
      const dialogRef = this.dialog.open(
        ConfirmDeleteTaskDialogComponent,
        {data: [task], autoFocus: true, width: '50%'}  // конфигурация
      );
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('процедура удаления задачи...')
          this.taskService.del(task.id).subscribe(
            next => {
              console.log("Удаление завершено!")

              this.taskService.getAll().subscribe(r => {
                this.taskService.tasks$.next(r)
              })
              
              }
          )
        }
      });
  }

  createTask() {

    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
  
    const dialogRef = this.dialog.open(
      CreateTaskDialogComponent,
      {data: [], autoFocus: true, width: '50%'}  // конфигурация
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result && result as Task){
        this.taskService.create(result).subscribe(
          next => {
            this.taskService.getAll().subscribe(r => {
              this.taskService.tasks$.next(r)
            })
          }
        )
      }
    });

  }

}
