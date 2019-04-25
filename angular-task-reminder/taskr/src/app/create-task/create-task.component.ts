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
  dt1; 
  constructor(private taskService: TaskService,
              private userService: UserService) { }

  createTask() {
    this.taskService.createTask(this.task, this.token)
      .subscribe(data => {
        if (!data) {
          this.createFailed = true;
        }
      });
  }

  // bleh(){
  //   console.log(this.task.deadline+this.task.title+this.task.assignedTo);
  // }
  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
          this.users=data["results"];
          console.log(this.users);
        });
  }



  ngOnInit() {
    this.getUsers();
  }

}
