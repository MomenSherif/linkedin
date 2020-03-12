import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FireLinkedinService {
  items: Observable<any[]>;
  constructor(private firestore: AngularFirestore) {}
  testAdd() {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("lists")
        .add({ types: "FullTime" })
        .then(
          res => console.log("Added Successfully"),
          err => reject(err)
        );
    });
  }
  test() {
    let skills = [];
    // return (this.items = this.firestore.collection("lists").valueChanges());
    this.firestore
      .collection("users")
      .get()
      .subscribe(snapshot => {
        snapshot.docs.forEach(doc => {
          doc.data().skills.forEach(skill => {
            skills.push(skill);
          });
        });
      });
    console.log(skills);
    return skills;
  }
}
