import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SyncService {
  ws: WebSocket;
  ws_msg: BehaviorSubject<string> = new BehaviorSubject('');

  private handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  private getHttpOptions(token) {
    if (token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        })
      };
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  constructor(private http: HttpClient) {
    this.initWebSocket();
  }

  post<T>(url, vars, token): Observable<T> {
    return this.http.post<T>(url, vars, this.getHttpOptions(token))
      .pipe(
        catchError(this.handleError<T>(null))
      );
  }

  get<T>(url,token): Observable<T> {
    return this.http.get<T>(url,this.getHttpOptions(token))
      .pipe(
        catchError(this.handleError<T>(null))
      );
  }

  initWebSocket(): void {
    this.ws = new WebSocket('ws://localhost:8000/ws/foobar?subscribe-broadcast');

    this.ws.onmessage = e => {
      console.log('Recieved socket message: ' + e.data);
      this.ws_msg.next(e.data);
    }

    this.ws.onopen = e => {
      console.log('websocket connected');
    };

    this.ws.onerror = e =>  {
      console.error('Socket encountered error: ', e, 'Closing socket');
      this.ws.close();
    };
    this.ws.onclose = e =>  {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(function () {
        this.initWebSocket();
      }, 1000);
    };

  }

  getMsgObservable() {
    return this.ws_msg.asObservable();
  }
}
