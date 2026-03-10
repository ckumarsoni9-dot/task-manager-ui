import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskStatusDto } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'https://localhost:7153/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(dto: CreateTaskDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  updateStatus(id: number, dto: UpdateTaskStatusDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, dto);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
