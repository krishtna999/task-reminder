import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  ws:WebSocket;
  ws_msg:BehaviorSubject<string>=new BehaviorSubject('');
  constructor() { 
    this.initWebSocket()
  }
  initWebSocket():void {
    this.ws = new WebSocket('ws://localhost:8000/ws/foobar?subscribe-broadcast');

    // this.ws.onmessage = function (e) {
      // console.log("GOT Data" + e.data);
    // };
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
