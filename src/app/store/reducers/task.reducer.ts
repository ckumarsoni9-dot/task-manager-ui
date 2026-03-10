import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from '../actions/task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({
    ...state, loading: true
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state, tasks, loading: false
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state, error, loading: false
  }))
);
