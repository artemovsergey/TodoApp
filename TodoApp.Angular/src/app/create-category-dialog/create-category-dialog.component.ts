import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../models/category';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-category-dialog',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatDialogModule, MatFormFieldModule, FormsModule],
  templateUrl: './create-category-dialog.component.html',
  styleUrl: './create-category-dialog.component.scss'
})
export class CreateCategoryDialogComponent {

  dialogRef = inject(MatDialogRef<CreateCategoryDialogComponent>)

  currentCategory: Category = {
    id: 0,
    title: ""
  }

  ok() {
    this.dialogRef.close(this.currentCategory)
  }
    
  cancel() {
    this.dialogRef.close()
  }

}
