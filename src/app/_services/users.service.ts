import { User } from "./../_models/user";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  users: User[] = [];
  FilteredArray: User[] = [];
  fieldNum = 0;
  inputval: string;
  constructor(private firestore: AngularFirestore) {
    this.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as User)
        } as User;
      });
    });
  }
  getUsers() {
    return this.firestore.collection("users").snapshotChanges();
  }
  createUser(user: User) {
    return this.firestore.collection("policies").add(user);
  }
  updateUser(user: User) {
    this.firestore.doc("users/" + user.id).update(user);
  }
  deleteUser(userID: string) {
    this.firestore.doc("users/" + userID).delete();
  }
  getUserById(userID: string) {
    return this.firestore.doc("users/" + userID).snapshotChanges();
  }
  getUserEducation(userID: string) {
    return this.firestore
      .doc("users/" + userID)
      .collection("educations")
      .snapshotChanges();
  }
  getUserByName(UserName: string) {
    return this.firestore
      .collection("users", ref => ref.where("name", "==", UserName))
      .snapshotChanges();
  }
  filterProducts(inputVal): User[] {
    this.inputval = inputVal;
    this.FilteredArray = this.users.filter(e => e.name.includes(inputVal));
    // console.log(this.FilteredArray);

    return this.FilteredArray;
  }
  ChooseField(i: number): User[] {
    this.fieldNum = i;
    if (i === 0) {
      this.FilteredArray = this.users.filter(e =>
        e.name.includes(this.inputval)
      );
      return this.FilteredArray;
    } else if (i === 1) {
      this.FilteredArray = this.users.filter(e =>
        e.jobTitle.includes(this.inputval)
      );
      // console.log(this.FilteredArray);
      return this.FilteredArray;
    } else if (i === 2) {
      this.FilteredArray = this.users.filter(e =>
        e.company.includes(this.inputval)
      );
      // console.log(this.FilteredArray);
      return this.FilteredArray;
    } else {
      this.FilteredArray = this.users.filter(e =>
        e.address.country.includes(this.inputval)
      );
      return this.FilteredArray;
    }
  }
}
