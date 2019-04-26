import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private getTasksUrl = "http://localhost:8000/tasks/";
  private createTaskUrl="http://localhost:8000/tasks/create";
  constructor(private http: HttpClient) { }

  handleError<T>(result: T){
    return (error:any):Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getTasks(user:string): Observable<Task[]> {
    return this.http.get<Task[]>(this.getTasksUrl+user)
    .pipe(
      catchError(this.handleError<Task[]>(null))
    );
  }

  createTask(task:Task,token:string):Observable<Task> {
    console.log('token:'+token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+token
      })
    };

    return this.http.post<Task>(this.createTaskUrl, task, httpOptions)
      .pipe(
        catchError(this.handleError<Task>(null))
        );

  }

}
