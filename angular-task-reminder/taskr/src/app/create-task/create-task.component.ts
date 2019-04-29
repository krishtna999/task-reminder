import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  VIEW_TASKS_URL='view/';
  VIEW_NOTIFICATIONS_URL='notifications/';

  @Input() token: string;

  // Using create status to indicate 401 not authorized errors 
  createFailed = false;
  task = new Task();
  users;
  dt1;
  constructor(private taskService: TaskService,
    private userService: UserService,
    private router: Router) { }

  createTask() {
    this.taskService.createTask(this.task, this.token)
      .subscribe(data => {
        if (!data) {
          this.createFailed = true;
        }
        else {
          this.createFailed = false;
          this.router.navigateByUrl(this.VIEW_TASKS_URL);
        }
      });
  }


  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data["results"];
        console.log(this.users);
      });
  }



  ngOnInit() {
    this.token = localStorage.getItem("token");
    if (!this.token) {
      // User hasn't logged in => redirect to login
      this.router.navigateByUrl('/');
    }
    this.getUsers();
  }

}
