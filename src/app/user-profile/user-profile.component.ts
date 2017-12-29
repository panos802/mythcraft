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
  testData: string;
  // userData: Observable<any>;

  constructor(public auth: AuthService) {}

  // currently not used
  setTestData() {
    const id = this.auth.userId;
    const data = {
      'uid': id,
      'testData': this.testData
    };
    this.auth.setDataFromId(id, data);
  }

  updateData() {
    const id = this.auth.userId;
    const data = {
      'photoURL': this.testData
    };
    this.auth.updateDataFromId('users', id, data);
    // document.body.style.backgroundImage = 'url(' + this.testData + ')';
  }
}
