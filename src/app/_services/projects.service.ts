import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  QuerySnapshot,
  DocumentReference
} from "@angular/fire/firestore";
import "firebase/firestore";
import * as firebase from "firebase";
import { Project } from "../_models/project";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  constructor(
    private fireStoreService: AngularFirestore,
    private authService: AuthService
  ) {}
  projects: Project[] = [];
  userRef: string = "4Fm78GOiEUHnNO8Hr7Yh";
  getProjects(): Observable<QuerySnapshot<Project>> {
    this.authService.user.subscribe(us => {
      this.userRef = us.uid;
    });
    console.log(this.userRef);
    return this.fireStoreService
      .collection("users")
      .doc(this.userRef)
      .collection("projects")
      .get();
  }

  addProject(project: Project): Promise<DocumentReference> {
    return this.fireStoreService
      .collection("users")
      .doc(this.userRef)
      .collection("projects")
      .add(project);
  }
}
