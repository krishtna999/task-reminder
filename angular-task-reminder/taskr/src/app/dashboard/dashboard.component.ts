import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  CREATE_URL = 'create/';
  VIEW_TASK_BY_USER_URL='view/';
  username:string;
  myTasks:Task[];
  token:string;
  
  private getFromStorage() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      // User hasn't logged in => redirect to login
      this.router.navigateByUrl('/');
    }
    this.username=localStorage.getItem('username');
  }

  constructor(
    private taskService:TaskService,
    private router:Router) { }


  ngOnInit() {
    this.getFromStorage();
  }

}
