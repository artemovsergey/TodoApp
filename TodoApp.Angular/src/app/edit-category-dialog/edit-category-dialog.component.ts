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

@Component({
  selector: 'app-edit-category-dialog',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss'
})
export class EditCategoryDialogComponent {

    categoryService = inject(CategoryService)
    private dialogRef = inject(MatDialogRef<EditCategoryDialogComponent>)
    readonly data = inject<any>(MAT_DIALOG_DATA)

    currentCategory: any = {}

    ngOnInit(): void {
      this.currentCategory.title = this.data[0].title
    }
  
    ok(): any {
      this.data[0].title = this.currentCategory.title
      this.dialogRef.close(this.data[0])
    }
  
    cancel() {
      this.dialogRef.close()
    }
  
}
