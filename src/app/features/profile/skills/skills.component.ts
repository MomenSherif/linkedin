import { Component, OnInit } from "@angular/core";
import { SkillsService } from "src/app/_services/skills.service";
import { Skill } from "src/app/_models/skill";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"]
})
export class SkillsComponent implements OnInit {
  addSkill: boolean = false;
  editSkills: boolean = false;
  skillAlreadeyExist: boolean = false;
  showM: boolean = true;
  showL: boolean = false;
  skills: Skill[];
  skillName: Skill;
  constructor(private skillService: SkillsService) {}

  ngOnInit(): void {
    this.skills = this.skillService.getSkills();
  }
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
    if (this.skillName !== undefined) {
      this.skillService.addSkillToUi(this.skillName);
    }
    this.editSkills = false;
  }
  showMore() {
    this.showL = true;
    this.showM = false;
  }
  showLess() {
    this.showM = true;
    this.showL = false;
  }
  onAddNewSkill(skillName: string) {
    this.skillAlreadeyExist = this.skillService.addSkill({ name: skillName });
    if (!this.skillAlreadeyExist) {
      this.addSkill = false;
    }
  }
  onDeleteSkill(skill: Skill) {
    this.skillName = skill;
    this.skillService.deleteSkillFromUi(skill);
  }
  onDeleteSkillDb() {
    if (this.skillName !== undefined) {
      this.skillService.deleteSkill(this.skillName);
    }
    this.editSkills = false;
  }
}
