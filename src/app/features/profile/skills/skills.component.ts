import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"]
})
export class SkillsComponent implements OnInit {
  addSkill: boolean = false;
  editSkills: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  onAddSkill() {
    this.addSkill = true;
  }
  onCloseAddSkill() {
    this.addSkill = false;
  }
  onEditSkill() {
    this.editSkills = true;
  }
  onCloseEditSkill() {
    this.editSkills = false;
  }
}
