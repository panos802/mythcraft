import { Component, OnInit } from '@angular/core';
// import { Router, Routes } from '@angular/router';

/*
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
*/
// interface Post {
//   title: string;
//   content: string;
//   ref: number;
// }
// interface PostId extends Post {
//   id: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // postsCol: AngularFirestoreCollection<Post>;
  // posts: any;
  // postDoc: AngularFirestoreDocument<Post>;
  // post: Observable<Post>;
/*
  postsCol: AngularFirestoreCollection<any>;
  posts: any;
  postDoc: AngularFirestoreDocument<any>;
  post: Observable<any>;

  // messagesCol: AngularFirestoreCollection<any>;
  // messages: any;

  title: string;
  content: string;
  ref: number = 0;
*/

  constructor(/*private afs: AngularFirestore*/) {}

  ngOnInit() {

  /*
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data(); // as Post;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });

    // this.messagesCol = this.afs.collection('messages').add({});
    // this.messages = this.messagesCol.valueChanges();
  */
  }


  /*
  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content, 'ref': this.ref});
    // this.afs.collection('posts').doc('my-custom-id').set({'title': this.title, 'content': this.content});
    this.title = '';
    this.content = '';
    this.ref = 0;
  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/' + postId);
    this.post = this.postDoc.valueChanges();
  }

  deletePost(postId) {
    this.afs.doc('posts/' + postId).delete();
  }
  */
}
