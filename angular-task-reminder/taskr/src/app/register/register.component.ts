import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { isError } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user=new User();
  constructor(private userService:UserService) { }
  alreadyExists=false;

  createUser(){
    this.userService.createUser(this.user).
      subscribe(
        data=>{
          if(!data){
            this.alreadyExists=true;  
          }
        }
      )
  }
  ngOnInit() {
  }

}
