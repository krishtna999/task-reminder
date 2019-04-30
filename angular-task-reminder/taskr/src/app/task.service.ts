import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './task';
import { SyncService } from './sync.service';

const GET_TASK_URL = 'http://localhost:8000/tasks/';
const CREATE_TASK_URL = 'http://localhost:8000/tasks/create';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private syncService: SyncService) { }


  getTasks(user: string): Observable<Task[]> {
    return this.syncService.get<Task[]>(GET_TASK_URL + user);
  }

  createTask(task: Task, token: string): Observable<Task> {
    return this.syncService.post<Task>(CREATE_TASK_URL, task, token);
  }

}
