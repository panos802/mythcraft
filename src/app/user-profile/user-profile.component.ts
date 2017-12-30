import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {

  imageURL: string;
  displayName: string;
  email: string = 'test@gmail.com';
  password: string = 'panasonic802';
  // userData: Observable<any>;

  constructor(public auth: AuthService) {}

  // updateData() {
  //   const id = this.auth.userId;
  //   const data = {
  //     'photoURL': this.testData
  //   };
  //   this.auth.updateDataFromId('users', id, data);
  // }
}
