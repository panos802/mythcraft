import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCYOiZIBT2Q2xgwwZFT4grXPriyjJoVIhU',
  authDomain: 'mythcraft-c42f0.firebaseapp.com',
  databaseURL: 'https://mythcraft-c42f0.firebaseio.com',
  projectId: 'mythcraft-c42f0',
  storageBucket: 'mythcraft-c42f0.appspot.com',
  messagingSenderId: '426547699034'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
