import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.css']
})
export class ViewNotificationsComponent implements OnInit {
  VIEW_URL='view/';


  token:string;
  notifications: Notification[];
  isEmpty = false;
  constructor(private notificationService: NotificationService,
    private userService: UserService,
    private router: Router) { }


  getNotifs(): void {
    if (this.token) {
      this.notificationService.getNotifications(this.token).subscribe(
        data => {
          if (data) {
            this.notifications = data['results'];
            console.log(this.notifications);
            if (this.notifications.length < 0) {
              this.isEmpty = true;
            }
          } else {
            console.log("ERROR !")
          }
        }
      )
    }
  }

  ngOnInit() {
    this.token = localStorage.getItem("token");
    if (!this.token) {
      // User hasn't logged in => redirect to login
      this.router.navigateByUrl('/login');
    }
    this.getNotifs();
    this.notificationService.getMsgObservable().subscribe(
      data => {
        // This will be triggered on new messages to the websocket 
        if (data == ":notification") {
          this.getNotifs();
        }
      }
    );

  }

}
