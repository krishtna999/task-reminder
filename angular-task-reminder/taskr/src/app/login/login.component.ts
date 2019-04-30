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
  private token = null;

  constructor(
    private userService: UserService,
    private router: Router) { }

  GetToken(): void {
    this.userService.login(this.user)
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

  ngOnDestroy() {
    localStorage.setItem("token", this.token);
  }

  ngOnInit() {
  }

}
