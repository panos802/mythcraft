import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCm9FPAW8euMzj1CEAlq3YyAyjOUFh5fYI',
  authDomain: 'mythcraft-a1e50.firebaseapp.com',
  databaseURL: 'https://mythcraft-a1e50.firebaseio.com',
  projectId: 'mythcraft-a1e50',
  storageBucket: 'mythcraft-a1e50.appspot.com',
  messagingSenderId: '584785955918'
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
