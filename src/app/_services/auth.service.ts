import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';

import { User as linkedinUser } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // onAuthStateChanged
  user: Observable<User>;
  currentUser: string;



  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(({ uid }) => this.currentUser = uid);
  }

  signUp(email: string, password: string, userData: linkedinUser) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      this.db.collection('users').doc(userCredential.user.uid).set(userData);
    });
  }

  login(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebaseAuth.signOut();
  }
}
