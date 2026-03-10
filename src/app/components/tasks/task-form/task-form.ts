import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateTaskDto } from '../../../models/task.model';
import * as TaskActions from '../../../store/actions/task.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-form',
    imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatIconModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  @Output() taskAdded = new EventEmitter<void>();

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['Medium', Validators.required],
    dueDate: [null]
  });

  onSubmit() {
    if (this.taskForm.invalid) return;

    const dto: CreateTaskDto = {
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description || '',
      priority: this.taskForm.value.priority as any,
      dueDate: this.taskForm.value.dueDate || undefined
    };

    this.store.dispatch(TaskActions.createTask({ dto }));
    this.taskForm.reset({ priority: 'Medium' });
    this.taskAdded.emit();
  }
}
