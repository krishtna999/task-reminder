import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SyncService } from '../sync.service';
import { NgFlashMessageService } from 'ng-flash-messages';

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
    private ngFlashMessageService: NgFlashMessageService, ) { }


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
              this.flashMessage('Deadline for "' + this.notifications[0].title + '" has passed ! ');
            }
          } else {
            console.log('Error in recieving notifications');
          }
        }
      );
    }
  }

  flashMessage(message: string) {
    this.flashNotifications.push(message);
    this.ngFlashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: this.flashNotifications,
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true,
      // Time after which the flash disappears defaults to 2000ms
      timeout: false,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: 'info'
    });
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
