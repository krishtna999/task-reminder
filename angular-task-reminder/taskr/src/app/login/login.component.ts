import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  wrongCredentials = false;
  token = null;

  getToken(): void {

    this.userService.getToken(this.user)
      .subscribe(data => {
        if (data) {
          this.token = data["token"];
          this.wrongCredentials = false;
          console.log(data, this.token);
        } else {
          this.wrongCredentials = true;
        }

      });

  }
  log(variable):void{
    console.log(variable);
  }
  constructor(private userService: UserService) { }
  ngOnInit() {
  }

}
