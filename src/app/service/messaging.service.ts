import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  
  currentMessage = new BehaviorSubject(null);
  constructor(private afMessaging: AngularFireMessaging) {  }

  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },  
      );
  }//requestPermission

  receiveMessage() {
    this.afMessaging.messages.subscribe(
    (payload) => {
    console.log("new message received. ", payload);
    this.currentMessage.next(payload);
    })
  }
}
