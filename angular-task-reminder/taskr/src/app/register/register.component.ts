import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  alreadyExists = false;

  constructor(
    private userService: UserService,
    private router:Router) { }


  createUser() {
    this.userService.createUser(this.user).
      subscribe(
        data => {
          if (!data) {
            this.alreadyExists = true;
          }
          else{
            this.router.navigateByUrl("/");
          }
        }
      );
  }
  ngOnInit() {
  }

}
