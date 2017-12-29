import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  theme?: string;
  status?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;
  userId: string; // current user id

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            this.userId = user.uid;
            // console.log( 'Got userId in constructor:' + this.userId);
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return Observable.of(null);
          }
        });
        this.user.subscribe(val => {
          // console.log(val);
          if (val) {
            document.body.style.backgroundImage = 'url(' + val.photoURL + ')';
          }
        });
  }

  emailSignup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log('Error during email signup:\n' + 'Error Code: ' + errorCode + '\nError Message: ' + errorMessage);
    });
  }
  emailLogin(email, password) {
    console.log('Trying to loggin with: ' + email);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((credential) => {
        console.log('Loggin with email: ' + email);
        console.log('Credential: ');
        console.log(credential);
      })
      .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log('Error during email login:\n' + 'Error Code: ' + errorCode + '\nError Message: ' + errorMessage);
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email // ,
      // displayName: user.displayName,
      // photoURL: user.photoURL
    };
    return userRef.set(data, {merge: true});
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      document.body.style.backgroundImage = '';
      this.router.navigate(['/']);
    }).catch(function(error) {
      // An error happened.
      console.log('Error during signout');
    });
  }




  // CUSTOM methods
  setDataFromId (id: string, data: Object) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`testCol/${id}`);
    return userRef.set(data);
  }
  updateDataFromId (col: string, id: string, data: Object) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${col}/${id}`);
    return userRef.update(data);
  }
  timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
  setMergeData(col: string, doc: string, data) {
    const ref: AngularFirestoreDocument<any> = this.afs.doc(`${col}/${doc}`);
    return ref.set(data, {merge: true});
  }
  deleteData(col: string, doc: string) {
    const ref: AngularFirestoreDocument<any> = this.afs.doc(`${col}/${doc}`);
    return ref.delete();
  }
}
