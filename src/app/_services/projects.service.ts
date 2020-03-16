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

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  constructor(private fireStoreService: AngularFirestore) {}
  projects: Project[] = [];
  userRef: string = "4Fm78GOiEUHnNO8Hr7Yh";
  getProjects(): Observable<QuerySnapshot<Project>> {
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

  deleteProject(project: Project) {
    this.getProjects().subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().name === project.name) {
          this.fireStoreService
            .collection("users")
            .doc(this.userRef)
            .collection("projects")
            .doc(doc.id)
            .delete()
            .then(() => {
              console.log("Deleted");
            })
            .catch(reason => {
              console.error("Can't delete", reason);
            });
        }
      });
    });
  }

  updateProject(project: Project) {
    this.getProjects().subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().name === project.name) {
          this.fireStoreService
            .collection("users")
            .doc(this.userRef)
            .collection("projects")
            .doc(doc.id)
            .set({
              associatedWith: project.associatedWith,
              currentlyWorking: project.currentlyWorking,
              description: project.description,
              endDate: project.endDate,
              name: project.name,
              projectUrl: project.projectUrl,
              startDate: project.startDate
            })
            .then(() => {
              console.log("updated");
            })
            .catch(reason => {
              console.error("Can't update", reason);
            });
        }
      });
    });
  }
}
