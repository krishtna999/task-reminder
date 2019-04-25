import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @Input() token: string;

  // Using create status to indicate 401 not authorized errors 
  createFailed = false;
  task = new Task();
  users;
  constructor(private taskService: TaskService,
              private userService: UserService) { }

  createTask(task, token) {
    this.taskService.createTask(this.task, this.token)
      .subscribe(data => {
        if (!data) {
          this.createFailed = true;
        }
      });
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
          this.users=data["results"];
          console.log(this.users);
        });
  }



  ngOnInit() {
    this.getUsers()
  }

}
