import { createAction, props } from '@ngrx/store';
import { Task, CreateTaskDto } from '../../models/task.model';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

export const createTask = createAction(
  '[Task] Create Task',
  props<{ dto: CreateTaskDto }>()
);

export const createTaskSuccess = createAction(
  '[Task] Create Task Success'
);

export const updateTaskStatus = createAction(
  '[Task] Update Status',
  props<{ id: number; status: string }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: number }>()
);
