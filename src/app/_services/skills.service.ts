import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import "firebase/firestore";
import { Observable } from "rxjs";
import { Skill } from "../_models/skill";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class SkillsService {
  constructor(private fireStoreService: AngularFirestore) {}
  userSkills: Skill[] = [];
  userRef: string;
  getSkills(): Skill[] {
    this.fireStoreService
      .collection("users")
      .get()
      .subscribe(snapshot => {
        snapshot.docs.forEach(doc => {
          this.userRef = doc.id;
          for (let i = 0; i < doc.data().skills.length; i++) {
            this.userSkills[i] = { name: doc.data().skills[i] };
          }
        });
      });
    return this.userSkills;
  }
  addSkill(skill: Skill): boolean {
    let alreadyExist: boolean = false;
    this.userSkills.forEach(sk => {
      if (sk.name === skill.name) {
        alreadyExist = true;
      }
    });
    if (alreadyExist) {
      return true;
    } else {
      this.userSkills.push(skill);
      this.fireStoreService
        .collection("users")
        .doc(this.userRef)
        .update({
          skills: firebase.firestore.FieldValue.arrayUnion(skill.name)
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(reason => {
          console.log(reason);
        });
      return false;
    }
  }

  deleteSkill(skill: Skill) {
    let index = this.userSkills.findIndex(sk => sk.name === skill.name);
    this.userSkills.splice(index, 1);
    console.log(index);
    this.fireStoreService
      .collection("users")
      .doc(this.userRef)
      .update({ skills: firebase.firestore.FieldValue.arrayRemove(skill.name) })
      .then(function() {
        console.log("Deleted");
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
