import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { SyncService } from '../sync.service';

const CREATE_URL = '/create';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  users: User[];
  queryUser: string;
  is404 = false;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private syncService: SyncService,
  ) { }


  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data['results'];
        // console.log(this.users);
      });
  }

  getTasks() {
    this.taskService.getTasks(this.queryUser)
      .subscribe(data => {
        if (data) {
          this.tasks = data['results'].slice().reverse();
          // console.log(this.tasks);
          if (this.tasks.length < 1) {
            this.tasks = null;
          }
        } else {
          this.is404 = true;
        }
      });
  }

  trackBy(user:User){
    if(user){
      return user.id;
    }
  }

  ngOnInit() {
    this.getUsers();

    this.syncService.getMsgObservable().subscribe(
      data => {
        console.log('Got :' + data);
        // This will be triggered on new messages to the websocket
        if (data == this.queryUser || this.queryUser == ':all') {
          this.getTasks();
        }
      }
    );
  }

}
