import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

// interface User {
//   uid: string;
//   email: string;
//   photoURL?: string;
//   displayName?: string;
//   theme?: string;
//   status?: string;
// }

@Injectable()
export class AuthService {

  user: Observable<any>;
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
            return this.afs.doc(`users/${user.uid}`).valueChanges();
          } else {
            return Observable.of(null);
          }
        });
      // Very bad code, do not subscribe in constructor
      // this.user.subscribe(val => {
      //   // console.log(val);
      //   if (val) {
      //     return document.body.style.backgroundImage = 'url(' + val.photoURL + ')';
      //   }
      // });
  }

  emailSignup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log('Error during email signup:\n' + 'Error Code: ' + errorCode + '\nError Message: ' + errorMessage);
    });
  }
  emailLogin(email, password) {
    console.log('Trying to loggin with: ' + email);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(a => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // New sign-in will be persisted with session persistence.
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((credential) => {
          console.log('Logging-In with email: ' + email);
          // console.log('Credential: ');
          // console.log(credential);
          // --------VALIDATE EMAIL
          // if (!credential.emailVerified) {
          //   // alert('Email not verified');
          //   // this.signOut();
          // } else {
          //   this.updateUserData(credential);
          // }
          this.updateUserData(credential);
        })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error during email login:\n' + 'Error Code: ' + errorCode + '\nError Message: ' + errorMessage);
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error from Persistance. Error code:');
      console.log(errorCode);
      console.log('Error message:');
      console.log(errorMessage);
    });
  }

  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   return this.oAuthLogin(provider);
  // }
  // private oAuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //     .then((credential) => {
  //       this.updateUserData(credential.user);
  //     });
  // }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    // The rest
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data /*: User*/ = {
      uid: user.uid,
      email: user.email ,
      status: 'online',
      // displayName: user.displayName,
      // photoURL: user.photoURL
    };
    userRef.set({lastLogIn: timestamp}, {merge: true});
    return userRef.set(data, {merge: true});
  }
  signOut() {
    document.body.style.backgroundImage = 'url(https://images2.alphacoders.com/759/thumb-1920-759668.jpg)';
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userId}`);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    userRef.set({status: 'offline'}, {merge: true})
    .then( () => {
      userRef.set({lastLogOut: timestamp}, {merge: true})
      .then( () => {
        this.afAuth.auth.signOut()
        .then(() => {
          this.router.navigate(['/']);
        }).catch((error) => {
          // An error happened.
          console.log('Error during signout proccess');
        });
      }).catch((error) => {
        // An error happened.
        console.log('Error during signout proccess');
      });
    }).catch((error) => {
      // An error happened.
      console.log('Error during signout proccess');
    });
  }


  // CUSTOM methods
  updateDataFromId (col: string, id: string, data: Object) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${col}/${id}`);
    return userRef.update(data);
  }
  setMergeData(col: string, doc: string, data) {
    const ref: AngularFirestoreDocument<any> = this.afs.doc(`${col}/${doc}`);
    return ref.set(data, {merge: true});
  }

  getUsers() {
    return this.afs.collection('users', ref => {
      return ref.orderBy('lastLogIn');
    }).valueChanges();
  }
  getMovesRef() {
    return this.afs.collection('moves', ref => {
      return ref.orderBy('name');
    });
  }
}
