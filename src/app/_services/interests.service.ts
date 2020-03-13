import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";
import * as firebase from "firebase";
import { InterestsCompanies } from "../_models/interests-company";

@Injectable({
  providedIn: "root"
})
export class InterestsService {
  constructor(private fireStoreService: AngularFirestore) {}

  interestsCompanies: InterestsCompanies[] = [];

  getInterestsCompanies(): InterestsCompanies[] {
    let nums = [];
    let ranNums = [],
      i = 0,
      j = 0;
    this.fireStoreService
      .collection("lists")
      .doc("interestsCompany")
      .get()
      .subscribe(snapshot => {
        for (let i = 0; i < snapshot.get("companies").length; i++) {
          nums[i] = i;
        }
        i = nums.length;
        while (i--) {
          j = Math.floor(Math.random() * (i + 1));
          ranNums.push(nums[j]);
          nums.splice(j, 1);
        }
        for (let i = 0; i < snapshot.get("companies").length; i++) {
          this.interestsCompanies[i] = snapshot.get("companies")[ranNums[i]];
        }
        // snapshot.get("companies").forEach(company => {
        //   this.interestsCompanies.push({
        //     name: company.name,
        //     followCounter: company.followCounter,
        //     img: company.img
        //   });
        // });
      });
    return this.interestsCompanies;
  }
}
