import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateTaskDto,
  TaskListResponseDto,
  TaskResponseDto,
  TaskStatus,
  UpdateTaskDto,
} from '../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  private http = inject(HttpClient);

  create(data: CreateTaskDto): Observable<TaskResponseDto> {
    return this.http.post<TaskResponseDto>(`${this.apiUrl}`, data);
  }

  findAll(page: number, limit: number, status?: TaskStatus): Observable<TaskListResponseDto> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;

    return this.http.get<TaskListResponseDto>(url);
  }

  findOne(taskId: string): Observable<TaskResponseDto> {
    return this.http.get<TaskResponseDto>(`${this.apiUrl}/${taskId}`);
  }

  update(taskId: string, data: UpdateTaskDto): Observable<TaskResponseDto> {
    return this.http.patch<TaskResponseDto>(`${this.apiUrl}/${taskId}`, data);
  }

  remove(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
