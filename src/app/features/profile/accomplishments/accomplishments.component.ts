import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/_services/projects.service";
import { Project } from "src/app/_models/project";

@Component({
  selector: "app-accomplishments",
  templateUrl: "./accomplishments.component.html",
  styleUrls: ["./accomplishments.component.scss"]
})
export class AccomplishmentsComponent implements OnInit {
  editAccom: boolean[] = [];
  notEditAccom: boolean[] = [];
  currentEditing: number = 0;
  addAccom: boolean = false;
  projects: Project[] = [];
  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        this.projects.push(doc.data());
        this.editAccom.push(false);
        this.notEditAccom.push(true);
      });
    });
  }
  onEditAccom() {
    this.editAccom[this.currentEditing] = true;
    this.notEditAccom[this.currentEditing] = false;
    console.log(this.currentEditing);
  }
  cancelEditAccom() {
    this.editAccom[this.currentEditing] = false;
    this.notEditAccom[this.currentEditing] = true;
  }

  onAddAccom() {
    this.addAccom = true;
  }

  handelFormSubmission(project: Project) {
    console.log(project);
    this.projects.push(project);
    this.editAccom.push(false);
    this.notEditAccom.push(true);
    this.projectService
      .addProject(project)
      .then(docRef => {
        console.log("Document Added Succ ", docRef);
      })
      .catch(error => {
        console.error("Error adding doc", error);
      });
  }
}
