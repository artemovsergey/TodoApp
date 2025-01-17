import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryDialogComponent } from '../create-category-dialog/create-category-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  dialog = inject(MatDialog);
  categoryService = inject(CategoryService);
  taskService = inject(TasksService);
  selectedCategory!: Category | null;

  @Input()
  categories: Category[] | null = [];

  @Output()
  selectCategory = new EventEmitter<Category | null>();

  @Output()
  updateEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.categoryService.selectedCategory$.subscribe((r) => {
      this.selectedCategory = r;
    });
  }

  removeCategory() {
    this.categoryService.del(this.selectedCategory!.id).subscribe((next) => {
      console.log('Категория удалена!');
      this.selectedCategory = null;
      this.updateEvent.emit();

      this.taskService.getTasksByCategory(0).subscribe((tasks) => {
        this.taskService.tasks$.next(tasks);
        console.log('! ', tasks);
      });
    });
  }

  emitCategory(category: Category | null) {
    this.taskService
      .getTasksByCategory(category?.id ?? 0)
      .subscribe((tasks) => {
        this.taskService.tasks$.next(tasks);
        console.log('! ', tasks);
      });

    this.selectCategory.emit(category);
    this.categoryService.selectedCategory$.next(category);
  }

  editCategory() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [this.selectedCategory],
      autoFocus: true,
      width: '50%',
    });

    // подписка на результат диалога
    dialogRef.afterClosed().subscribe((result) => {
      if (result && (result as Category)) {
        this.categoryService.update(result).subscribe((r) => {
          console.log('Категория обновлена!');

          // обновить задачи
          this.taskService
            .getTasksByCategory(result?.id ?? 0)
            .subscribe((tasks) => {
              this.taskService.tasks$.next(tasks);
              console.log('! ', tasks);
            });
        });
      }
    });
  }

  createCategory() {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      data: [],
      autoFocus: true,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && (result as Category)) {
        this.categoryService.create(result).subscribe((r) => {
          console.log('Категория создана!');
          this.updateEvent.emit(true);
        });
      }
    });
  }
}
