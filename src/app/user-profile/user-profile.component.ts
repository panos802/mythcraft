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

  updateUserData (field: string, value) {
    const key = field;
    const data = {};
    data[key] = value;
    this.auth.setMergeData('users', this.auth.userId, data);
  }

  setBackground(imageURL) {
    document.body.style.backgroundImage = 'url(' + imageURL + ')';
  }

  updateBackground (imageURL) {
    this.updateUserData('photoURL', imageURL);
    this.setBackground(imageURL);
  }
}
