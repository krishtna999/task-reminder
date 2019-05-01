import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { SyncService } from '../sync.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.css']
})
export class ViewNotificationsComponent implements OnInit {
  VIEW_URL = 'view/';
  private token: string;
  notifications = new Array();
  isEmpty = false;
  username: string;
  flashNotifications;

  private getFromStorage() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      // User hasn't logged in => redirect to login
      this.router.navigateByUrl('/');
    }
    this.username = localStorage.getItem('username');
  }

  constructor(
    private notificationService: NotificationService,
    private syncService: SyncService,
    private router: Router,
    private snotifyService: SnotifyService,
  ) { }


  getNotifs(shouldFlash): void {
    if (this.token) {
      this.notificationService.getNotifications(this.token).subscribe(
        data => {
          if (data) {
            this.notifications = data['results'].slice().reverse();
            // console.log(this.notifications);
            if (this.notifications.length <= 0) {
              this.isEmpty = true;
            }
            if (shouldFlash) {
              this.snotifyService.warning('Deadline Reached', this.notifications[0].title, {timeout: 60000});
            }
          } else {
            console.log('Error in recieving notifications');
          }
        }
      );
    }
  }



  ngOnInit() {
    this.flashNotifications = new Array();
    this.getFromStorage();
    this.getNotifs(false);
    this.syncService.getMsgObservable().subscribe(
      data => {
        // This will be triggered on new messages to the websocket
        if (data == ':notification') {
          this.getNotifs(true);
        }
      }
    );

  }

}
