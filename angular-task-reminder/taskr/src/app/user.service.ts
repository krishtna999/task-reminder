import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getTokenUrl = "http://localhost:8000/api-token-auth/";
  private usersUrl= "http://localhost:8000/users/";

  constructor(private http: HttpClient) { }

  getToken(user: User): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<String>(this.getTokenUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError<String>(null))
        );
  };

  getUsers(): Observable<Object> {
    return this.http.get<Object>(this.usersUrl);
  }

  createUser(user:User): Observable<User>{
    return this.http.post<User>(this.usersUrl, user)
      .pipe(
        catchError(this.handleError<User>(null))
        );
  }

  handleError<T>(result: T){
    return (error:any):Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}


