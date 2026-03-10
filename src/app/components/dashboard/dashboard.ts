import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import * as TaskActions from '../../store/actions/task.actions';
import * as TaskSelectors from '../../store/selectors/task.selectors';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { TaskForm } from '../tasks/task-form/task-form';
import { TaskList } from '../tasks/task-list/task-list';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule, AsyncPipe,
    TaskForm, TaskList,
    MatTabsModule, MatCardModule, MatIconModule,
    MatProgressSpinnerModule, MatExpansionModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private store = inject(Store);

  allTasks$ = this.store.select(TaskSelectors.selectAllTasks);
  pendingTasks$ = this.store.select(TaskSelectors.selectPendingTasks);
  inProgressTasks$ = this.store.select(TaskSelectors.selectInProgressTasks);
  completedTasks$ = this.store.select(TaskSelectors.selectCompletedTasks);
  loading$ = this.store.select(TaskSelectors.selectLoading);

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }
}
