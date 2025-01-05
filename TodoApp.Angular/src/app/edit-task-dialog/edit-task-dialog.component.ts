import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Priority } from '../../models/priority';
import { TestData } from '../../data/testdata';
import { Category } from '../../models/category';
import { Task } from '../../models/task';
import { PriorityService } from '../../services/priority.service';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatInputModule],
  providers: [],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditTaskDialogComponent implements OnInit{

  categoryService = inject(CategoryService)
  priorityService = inject(PriorityService)
  
  private dialogRef = inject(MatDialogRef<EditTaskDialogComponent>)
  readonly data = inject<any>(MAT_DIALOG_DATA)

  priorities: Priority[] = []
  categories: Category[] = []

  currentTask: Task = {
    id: this.data[0].id,
    title: this.data[0].title,
    complete: this.data[0].complete,
    date: this.data[0].date,
    priorityId: this.data[0]?.priorityId,
    categoryId: this.data[0]?.categoryId,
  }

  ngOnInit(): void {

    this.categoryService.getAll().subscribe(
      next => {this.categories = next}
    )

    this.priorityService.getAll().subscribe(
      next => {this.priorities = next}
    )
  }

  ok(): any {
    this.dialogRef.close(this.currentTask)
  }

  cancell() {
    this.dialogRef.close()
  }

  // compareByCategory(f1: Category, f2: Task): boolean {
  //   return  f1.id === f2.categoryId;
  // }

  // compareByPriority(f1: Priority, f2: Task): boolean {
  //   return f1 && f2 && f1.id === f2.priorityId;
  // }

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent): void {
  //   if (event.key === 'Enter') {
  //     this.ok();
  //   }
  // }

}
