import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../../models/task.model';
import * as TaskActions from '../../../store/actions/task.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
    imports: [
    CommonModule, DatePipe,
    MatCardModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatMenuModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
   private store = inject(Store);

  @Input() tasks: Task[] = [];

  getPriorityIcon(priority: string): string {
    const icons: any = { Low: '🟢', Medium: '🟡', High: '🔴' };
    return icons[priority] || '⚪';
  }

  getStatusIcon(status: string): string {
    const icons: any = {
      Pending: '⏳',
      InProgress: '▶️',
      Completed: '✅'
    };
    return icons[status] || '';
  }

  updateStatus(id: number, status: string) {
    this.store.dispatch(TaskActions.updateTaskStatus({ id, status }));
    this.store.dispatch(TaskActions.loadTasks());
  }

  deleteTask(id: number) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
    this.store.dispatch(TaskActions.loadTasks());
  }
}
