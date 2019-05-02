import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { SyncService } from '../sync.service';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  CREATE_URL = '/create';
  VIEW_NOTIFICATIONS_URL = 'notifications/';

  tasks: Task[];
  queryUser: string;
  is404 = false;
  @Input('queryUser')
  set name(name: string) {
    this.queryUser = name;
    this.getTasks(false);
    // console.log(this.queryUser);
  }
  constructor(
    private taskService: TaskService,
    private syncService: SyncService,
    private snotifyService: SnotifyService,
  ) { }


  getTasks(shouldFlash: boolean) {
    this.taskService.getTasks(this.queryUser)
      .subscribe(data => {
        if (data) {
          this.tasks = data['results'].slice().reverse();
          if (this.tasks.length < 1) {
            this.tasks = null;
          }
          this.is404 = false;
          if (shouldFlash) {
            this.snotifyService.info('Assigned by ' + this.tasks[0].createdBy, this.tasks[0].title, { timeout: 60000 });
          }
        } else {
          this.is404 = true;
        }
      });
  }


  ngOnInit() {
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
