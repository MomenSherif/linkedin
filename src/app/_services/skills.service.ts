import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  QuerySnapshot,
  DocumentChangeAction
} from "@angular/fire/firestore";
import "firebase/firestore";
import { switchMap } from "rxjs/operators";
import { Skill } from "../_models/skill";
import * as firebase from "firebase";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SkillsService {
  userSkills: Skill[] = [];
  userRef: string;
  constructor(
    private fireStoreService: AngularFirestore,
    private authService: AuthService
  ) {}

  getUserSkills(userId: string): Observable<DocumentChangeAction<Skill>[]> {
    return this.fireStoreService
      .collection("users")
      .doc(userId)
      ?.collection("skills")
      .snapshotChanges();
  }
  getSkills(userId: string): Observable<QuerySnapshot<Skill>> {
    return this.fireStoreService
      .collection("users")
      ?.doc(userId)
      ?.collection("skills")
      .get();
  }
  addUserSkill(skill: Skill) {
    this.userRef = this.authService.currentUser;
    return this.fireStoreService
      .collection("users")
      .doc(this.userRef)
      .collection("skills")
      .add(skill);
  }

  deleteUserSkill(skill: Skill) {
    this.userRef = this.authService.currentUser;
    this.getUserSkills(this.userRef).subscribe(snapshot => {
      snapshot.forEach(snap => {
        if (snap.payload.doc.data()["name"] === skill.name) {
          return this.fireStoreService
            .collection("users")
            .doc(this.userRef)
            .collection("skills")
            .doc(snap.payload.doc.id)
            .delete();
        }
      });
    });
  }

  getEndorsedBy(userId: string) {
    return this.fireStoreService
      .collection("users")
      .doc(userId)
      ?.collection("skills")
      .snapshotChanges();
  }

  addEndorsement(userId: string, skill: Skill) {
    this.userRef = this.authService.currentUser;
    this.getSkills(userId).subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data()["name"] === skill.name) {
          if (doc.data()["endorsedBy"] === undefined) {
            this.fireStoreService
              .collection("users")
              .doc(userId)
              ?.collection("skills")
              .doc(doc.id)
              .set(
                {
                  endorsedBy: [this.userRef]
                },
                { merge: true }
              )
              .then(() => {
                console.log("Added endorsedBy");
              })
              .catch(e => {
                console.log(e);
              });
          } else {
            this.fireStoreService
              .collection("users")
              .doc(userId)
              ?.collection("skills")
              .doc(doc.id)
              .update({
                endorsedBy: firebase.firestore.FieldValue.arrayUnion(
                  this.userRef
                )
              })
              .then(() => {
                console.log("Updated endorsedBy");
              })
              .catch(e => {
                console.log(e);
              });
          }
        }
      });
    });
  }

  deleteEndorsement(userId: string, skill: Skill) {
    this.userRef = this.authService.currentUser;
    this.getSkills(userId).subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data()["name"] === skill.name) {
          this.fireStoreService
            .collection("users")
            .doc(userId)
            ?.collection("skills")
            .doc(doc.id)
            .update({
              endorsedBy: firebase.firestore.FieldValue.arrayRemove(
                this.userRef
              )
            })
            .then(() => {
              console.log("Deleted endorsedBy");
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    });
  }

  getUserById(userId: string) {
    return this.fireStoreService
      .collection("users")
      .doc(userId)
      .get();
  }
}
