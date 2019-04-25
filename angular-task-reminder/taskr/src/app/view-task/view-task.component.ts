import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../user';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  users: UserDetail[];
  queryUser: string;
  is404=false;
  dt1;
  constructor(private taskService: TaskService,
    private userService: UserService) { }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data["results"];
        console.log(this.users);
        this.users.unshift(
          {
            id: 0,
            username: 'all'
          }
        );
      });
  }

  getTasks(){
    this.taskService.getTasks(this.queryUser)
      .subscribe(data=> {
        if(data){
          this.tasks=data["results"];
          console.log(this.tasks);
        }
        else{
          this.is404=true;
        }
      })
  }



  ngOnInit() {
    this.getUsers();
  }

}
