import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

const CREATE_URL = '/create'

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
  ws:WebSocket;
  constructor(private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data["results"];
        console.log(this.users);
      });
  }

  getTasks() {
    this.taskService.getTasks(this.queryUser)
      .subscribe(data => {
        if (data) {
          this.tasks = data["results"];
          for (var i = 0; i < this.tasks.length; i++) {
            this.tasks[i].assignedTo = this.users.find(user => user.id === this.tasks[i].assignedTo).username;
          }

          console.log(this.tasks);
          if (this.tasks.length < 1) {
            this.tasks = null;
          }
        }
        else {
          this.is404 = true;
        }
      });
  }

  goto(): void {
    this.router.navigateByUrl(CREATE_URL);
  }

  ngOnInit() {
    this.getUsers();
    this.notificationService.getMsgObservable().subscribe(
      data =>{
        // This will be triggered on new messages to the websocket 
        if(data==this.queryUser){
          this.getTasks()
        }
      }
    )
  }

}
