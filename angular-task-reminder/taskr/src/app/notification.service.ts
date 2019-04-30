import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SyncService } from './sync.service';

const NOTIFICATIONS_URL = 'http://localhost:8000/notifications/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private syncService: SyncService) {
  }

  getNotifications(token) {
    console.log('Polling for notifications !');
    return this.syncService.post<Notification>(NOTIFICATIONS_URL, null, token);
  }

}
