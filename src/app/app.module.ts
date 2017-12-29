import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


const firebaseConfig = {
  apiKey: 'AIzaSyCm9FPAW8euMzj1CEAlq3YyAyjOUFh5fYI',
  authDomain: 'mythcraft-a1e50.firebaseapp.com',
  databaseURL: 'https://mythcraft-a1e50.firebaseio.com',
  projectId: 'mythcraft-a1e50',
  storageBucket: 'mythcraft-a1e50.appspot.com',
  messagingSenderId: '584785955918'
};

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
