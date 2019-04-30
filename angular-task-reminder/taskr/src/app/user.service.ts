import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { SyncService } from './sync.service';

const LOGIN_URL = "http://localhost:8000/api-token-auth/";
const USERS_URL = "http://localhost:8000/users/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private syncService: SyncService, ) { }

  login(user: User): Observable<Object> {
    return this.syncService.post(LOGIN_URL, user, null)
  };

  getUsers(): Observable<Object> {
    return this.syncService.get(USERS_URL);
  }

  createUser(user: User): Observable<User> {
    return this.syncService.post(USERS_URL, user, null);
  }

}


