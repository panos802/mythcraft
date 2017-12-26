import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  title: string;
  content: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  // messagesCol: AngularFirestoreCollection<string>;
  // messages: Observable<string[]>;

  title: string;
  content: string;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.valueChanges();

    // this.messagesCol = this.afs.collection('messages');
    // this.messages = this.messagesCol.valueChanges();
  }

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content});
    this.title = '';
    this.content = '';
    // this.afs.collection('messages').add({'message': 'addition'});
  }

}
