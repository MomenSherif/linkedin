import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/_services/projects.service";
import { Project } from "src/app/_models/project";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";

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
  currentEditingProj: Project = null;
  userId: string;
  currentOpenUser: boolean = true;
  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.userId = id ? id : this.authService.currentUser;
      this.currentOpenUser =
        this.userId === this.authService.currentUser ? true : false;
      this.projectService.getProjects(this.userId).subscribe(snapshot => {
        snapshot.docs.forEach(doc => {
          this.projects.push(doc.data());
          this.editAccom.push(false);
          this.notEditAccom.push(true);
        });
      });
    });
  }
  onEditAccom() {
    this.editAccom[this.currentEditing] = true;
    this.notEditAccom[this.currentEditing] = false;
  }
  cancelEditAccom() {
    this.editAccom[this.currentEditing] = false;
    this.notEditAccom[this.currentEditing] = true;
  }

  onAddAccom() {
    this.currentEditingProj = null;
    this.addAccom = true;
  }

  handelFormSubmission(project: Project) {
    if (this.currentEditingProj === null) {
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
    } else {
      let index = this.projects.findIndex(proj => proj.name === project.name);
      this.projects[index] = project;
      this.projectService.updateProject(project);
    }
  }
  currentlyEditingProj(project: Project) {
    this.currentEditingProj = project;
    this.addAccom = true;
  }

  handelDeleteProj(project: Project) {
    let index = this.projects.findIndex(proj => proj.name === project.name);
    this.projects.splice(index, 1);
    this.projectService.deleteProject(project);
  }
}
