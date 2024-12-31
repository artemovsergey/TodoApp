import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { TestData } from '../../data/testdata';
import { Priority } from '../../models/priority';
import { Task } from '../../models/task';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss'
})
export class CreateTaskDialogComponent {
  
  categoryService = inject(CategoryService)
  dialogRef = inject(MatDialogRef<CreateTaskDialogComponent>)
  data = inject<any>(MAT_DIALOG_DATA)
  priorities: Priority[] = TestData.priorities
  
  currentTask: Task = {
    id: 10,
    title: "",
    complete: false,
    date: new Date() 
  }

  ngOnInit(): void {
    // this.currentTask.title = this.data[0].title
    // this.currentTask.complete = this.data[0].complete
    // this.currentTask.date = this.data[0].date
    // this.currentTask.category = this.data[0].category
    // this.currentTask.priority = this.data[0].priority
  }
  
  ok(): any {

    console.log("Передана задача: ", this.currentTask)

    // this.data[0].title = this.currentTask.title
    // this.data[0].complete = this.currentTask.complete
    // this.data[0].date = this.currentTask.date
    // this.data[0].category = this.currentTask.category
    // this.data[0].priority = this.currentTask.priority

     this.dialogRef.close(this.currentTask)
  }
  
  cancell() {
    this.dialogRef.close()
  }

  compareById(f1: any, f2: any): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
  

}
