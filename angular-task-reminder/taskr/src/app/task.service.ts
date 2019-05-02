import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { SyncService } from './sync.service';
import { HttpParams } from '@angular/common/http';

const CR_TASK_URL = 'tasks'; //<-- Create Read Task Url


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private syncService: SyncService) { }


  getTasks(user: string): Observable<Task[]> {
    const params = new HttpParams()
      .set('assignedTo__username', user);
    return this.syncService.get<Task[]>(CR_TASK_URL, params);
  }

  createTask(task: Task, token: string): Observable<Task> {
    return this.syncService.post<Task>(CR_TASK_URL, task, token);
  }
}
