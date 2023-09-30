import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  notifier = new EventEmitter<string>();
  notify(message: string) {
    this.notifier.emit(message);
  }
}
