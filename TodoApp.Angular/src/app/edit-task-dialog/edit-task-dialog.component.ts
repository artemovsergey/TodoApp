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
  private dialogRef = inject(MatDialogRef<EditTaskDialogComponent>)
  readonly data = inject<any>(MAT_DIALOG_DATA)
  priorities: Priority[] = TestData.priorities

  currentTask: any = {}

  //currentCategory: Category = this.data[0].category
  //categories: Category[] = TestData.categories

  ngOnInit(): void {
    this.currentTask.title = this.data[0].title
    this.currentTask.complete = this.data[0].complete
    this.currentTask.date = this.data[0].date
    this.currentTask.category = this.data[0].category
    this.currentTask.priority = this.data[0].priority
  }

  ok(): any {
    console.log("Передана задача: ", this.data[0].title)
    this.data[0].title = this.currentTask.title
    this.data[0].complete = this.currentTask.complete
    this.data[0].date = this.currentTask.date
    this.data[0].category = this.currentTask.category
    this.data[0].priority = this.currentTask.priority

    this.dialogRef.close(this.data[0])
  }

  cancell() {
    this.dialogRef.close()
  }

  compareById(f1: any, f2: any): boolean {
    return f1 && f2 && f1.id === f2.id;
  }


  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent): void {
  //   if (event.key === 'Enter') {
  //     this.ok();
  //   }
  // }

}
