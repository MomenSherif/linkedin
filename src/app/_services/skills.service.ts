import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import "firebase/firestore";
import { switchMap } from "rxjs/operators";
import { Skill } from "../_models/skill";
import * as firebase from "firebase";
import { AuthService } from "./auth.service";

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
  getSkills(): Skill[] {
    this.authService.user
      .pipe(
        switchMap(user => {
          this.userRef = user?.uid;
          return this.fireStoreService
            .collection("users")
            ?.doc(user.uid)
            .get();
        })
      )
      .subscribe(snapshot => {
        snapshot.get("skills")?.forEach(skill => {
          this.userSkills.push({
            name: skill
          });
        });
      });
    // this.authService.user.subscribe(us => {
    //   this.userRef = us.uid;
    //   this.fireStoreService
    //     .collection("users")
    //     .doc(this.userRef)
    //     .get()
    //     .subscribe(snapshot => {
    //       snapshot.get("skills")?.forEach(skill => {
    //         this.userSkills.push({
    //           name: skill
    //         });
    //       });
    //     });
    // });

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
  addSkillToUi(skill: Skill) {
    this.userSkills.push(skill);
  }
  deleteSkillFromUi(skill: Skill) {
    let index = this.userSkills.findIndex(sk => sk.name === skill.name);
    this.userSkills.splice(index, 1);
  }

  deleteSkill(skill: Skill) {
    console.log(skill);
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
