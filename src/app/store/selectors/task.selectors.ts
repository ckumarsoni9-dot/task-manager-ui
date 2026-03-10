import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  state => state.tasks
);

export const selectLoading = createSelector(
  selectTaskState,
  state => state.loading
);

export const selectPendingTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(t => t.status === 'Pending')
);

export const selectInProgressTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(t => t.status === 'InProgress')
);

export const selectCompletedTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(t => t.status === 'Completed')
);
