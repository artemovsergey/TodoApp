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
import { Category } from '../../models/category';
import { PriorityService } from '../../services/priority.service';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss'
})
export class CreateTaskDialogComponent {
  
  categories: Category[] = []
  priorityService = inject(PriorityService)
  categoryService = inject(CategoryService)
  dialogRef = inject(MatDialogRef<CreateTaskDialogComponent>)
  data = inject<any>(MAT_DIALOG_DATA)
  priorities: Priority[] = []
  
  currentTask: Task = {
    id: 0,
    title: "",
    complete: false,
    date: new Date()
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(r =>this.categories = r)
    this.priorityService.getAll().subscribe(r =>this.priorities = r)
  }
  
  ok(): any {
    console.log("Передана задача: ", this.currentTask)
     this.dialogRef.close(this.currentTask)
  }
  
  cancell() {
    this.dialogRef.close()
  }

  // compareById(f1: any, f2: any): boolean {
  //   return f1 && f2 && f1.id === f2.id;
  // }
  

}
