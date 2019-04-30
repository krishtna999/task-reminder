import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SyncService } from '../sync.service';
import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  CREATE_URL = '/create';
  VIEW_NOTIFICATIONS_URL = 'notifications/';

  flashNotifications;
  tasks: Task[];
  queryUser: string;
  is404 = false;
  @Input('queryUser')
  set name(name: string) {
    this.queryUser = name;
    this.getTasks(false);
  }
  constructor(
    private taskService: TaskService,
    private syncService: SyncService,
    private ngFlashMessageService: NgFlashMessageService
  ) { }


  getTasks(shouldFlash:boolean) {
    this.taskService.getTasks(this.queryUser)
      .subscribe(data => {
        if (data) {
          this.tasks = data['results'].slice().reverse();
          if (this.tasks.length < 1) {
            this.tasks = null;
          }
          this.is404 = false;
          if(shouldFlash){
            this.flashMessage('[NEW]"' + this.tasks[0].title + '" assigned by ' + this.tasks[0].createdBy);
          }
        } else {
          this.is404 = true;
        }
      });
  }

  flashMessage(message: string) {
    this.flashNotifications.push(message);
    this.ngFlashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: this.flashNotifications,
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true,
      // Time after which the flash disappears defaults to 2000ms
      timeout: false,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: 'info'
    });
  }

  ngOnInit() {
    this.flashNotifications=new Array();
    this.syncService.getMsgObservable().subscribe(
      data => {
        console.log('Got :' + data);
        // This will be triggered on new messages to the websocket
        if (data == this.queryUser || this.queryUser == ':all') {
          this.getTasks(true);
        }
      }
    );
  }

}
