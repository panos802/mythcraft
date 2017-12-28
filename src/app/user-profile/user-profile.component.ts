import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit{
  testData: string;
  // userData: Observable<any>;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    const ret = this.auth.user;
    ret.subscribe(val =>
      // console.log(val)
      document.body.style.backgroundImage = 'url(' + val.photoURL + ')'
    );
  }

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
