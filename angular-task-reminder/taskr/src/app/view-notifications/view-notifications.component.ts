import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SyncService } from '../sync.service';

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.css']
})
export class ViewNotificationsComponent implements OnInit {
  VIEW_URL = 'view/';
  private token: string;
  notifications: Notification[];
  isEmpty = false;
  private getFromStorage() {
    this.token = localStorage.getItem("token");
    if (!this.token) {
      // User hasn't logged in => redirect to login
      this.router.navigateByUrl('/');
    }
  }

  constructor(
    private notificationService: NotificationService,
    private syncService: SyncService,
    private router: Router) { }

  

  getNotifs(): void {
    if (this.token) {
      this.notificationService.getNotifications(this.token).subscribe(
        data => {
          if (data) {
            this.notifications = data['results'].slice().reverse();
            // console.log(this.notifications);
            if (this.notifications.length < 0) {
              this.isEmpty = true;
            }
          } else {
            console.log('Error in recieving notifications');
          }
        }
      );
    }
  }


  ngOnInit() {
    this.getFromStorage();
    this.getNotifs();
    this.syncService.getMsgObservable().subscribe(
      data => {
        // This will be triggered on new messages to the websocket
        if (data == ':notification') {
          this.getNotifs();
        }
      }
    );

  }

}
