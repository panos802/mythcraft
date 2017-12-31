import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any;

  load: boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  loadList() {
    this.users = this.auth.getUsers();
    this.load = true;
  }
}
