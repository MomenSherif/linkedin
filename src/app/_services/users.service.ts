import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  constructor(private firestore: AngularFirestore) { }
  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  createUser(user: User) {
    return this.firestore.collection('policies').add(user);
  }
  updateUser(user: User) {
    this.firestore.doc('users/' + user.id).update(user);
  }
  deleteUser(userID: string) {
    this.firestore.doc('users/' + userID).delete();
  }
  getUserById(userID: string) {
    return this.firestore.doc('users/' + userID).snapshotChanges();
  }
  getUserEducation(userID: string) {
    return this.firestore
      .doc('users/' + userID)
      .collection('educations')
      .snapshotChanges();
  }
  getUserByName(UserName: string) {
    return this.firestore
      .collection('users', ref => ref.where('name', '==', UserName))
      .snapshotChanges();
  }
}
