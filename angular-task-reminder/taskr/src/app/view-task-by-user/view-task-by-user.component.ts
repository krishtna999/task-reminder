import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view-task-by-user',
  templateUrl: './view-task-by-user.component.html',
  styleUrls: ['./view-task-by-user.component.css']
})
export class ViewTaskByUserComponent implements OnInit {
  DASHBOARD_URL='dashboard/'
  users: User[];
  private getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data['results'];
      });
  }
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getUsers();

  }

}
