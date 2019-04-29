import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationsUrl="http://localhost:8000/notifications/";
  ws:WebSocket;
  ws_msg:BehaviorSubject<string>=new BehaviorSubject('');
  constructor(private http:HttpClient) { 
    this.initWebSocket();
  }

  getNotifications(token){
    console.log("Polling for notifications !");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+token,
      })
    };

    return this.http.post<Notification>(this.notificationsUrl,undefined,httpOptions);
      // .pipe(
        // catchError(this.handleError<Notification>(null))
        // );
  }

  initWebSocket():void {
    this.ws = new WebSocket('ws://localhost:8000/ws/foobar?subscribe-broadcast');

    this.ws.onmessage = e=>{
      console.log("Added for "+e.data);
      this.ws_msg.next(e.data);
    }

    this.ws.onopen = function () {
      console.log("websocket connected");
    };

    this.ws.onerror = function (e) {
      console.error(e);
    };
    this.ws.onclose = function (e) {
      console.log("connection closed");
    };
  }

  getMsgObservable(){
    return this.ws_msg.asObservable();
  }
}
