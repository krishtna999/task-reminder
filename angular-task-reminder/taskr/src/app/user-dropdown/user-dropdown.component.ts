import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit {
  users:User[];
  @Output() userSelect=new EventEmitter<string>();

  constructor(private userService: UserService) { }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data['results'];
        // console.log(this.users);
      });
  }

  ngOnInit() {
    this.getUsers();
  }

}
