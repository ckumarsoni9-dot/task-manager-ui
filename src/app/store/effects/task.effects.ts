import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from '../actions/task.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { TaskService } from '../../services/task';

@Injectable()
export class TaskEffects {

  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap(({ dto }) =>
        this.taskService.createTask(dto).pipe(
          map(() => TaskActions.createTaskSuccess()),
          catchError(error =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createTaskSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskSuccess),
      map(() => TaskActions.loadTasks())
    )
  );
}
