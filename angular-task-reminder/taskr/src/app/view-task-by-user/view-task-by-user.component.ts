import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view-task-by-user',
  templateUrl: './view-task-by-user.component.html',
  styleUrls: ['./view-task-by-user.component.css']
})
export class ViewTaskByUserComponent implements OnInit {
  DASHBOARD_URL = 'dashboard/';
  users: User[];

  constructor() { }
  disp(ok){
    console.log(ok);
  }
  ngOnInit() {
  }

}
