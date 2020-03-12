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
  test(): Observable<any[]> {
    // return (this.items = this.firestore.collection("lists").valueChanges());
    return this.firestore.collection("lists").snapshotChanges();
  }
}
