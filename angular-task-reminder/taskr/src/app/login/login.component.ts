import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

const VIEW_URL = '/view';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  user = new User();
  wrongCredentials = false;
  token = null;

  GetToken(): void {

    this.userService.getToken(this.user)
      .subscribe(data => {
        if (data) {
          this.token = data["token"];
          this.wrongCredentials = false;
          console.log(data, this.token);

          // Go to create if true
          this.router.navigateByUrl(VIEW_URL);
        } else {
          this.wrongCredentials = true;
        }

      });

  }


  constructor(private userService: UserService,
    private router: Router) { }

  ngOnDestroy() {
    this.userService.token = this.token;
    this.userService.username = this.user.username;
  }

  ngOnInit() {
  }

}
