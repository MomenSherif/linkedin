import { Component, OnInit } from "@angular/core";
import { SkillsService } from "src/app/_services/skills.service";
import { Skill } from "src/app/_models/skill";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"]
})
export class SkillsComponent implements OnInit {
  addSkill = false;
  editSkills = false;
  skillAlreadeyExist = false;
  showM = true;
  showL = false;
  skills: Skill[];
  skillName: Skill;
  userId: string;
  currentOpenUser: boolean = true;
  skillsEndorsement: [{}] = [{}];
  constructor(
    private skillService: SkillsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.userId = id ? id : this.authService.currentUser;
      this.currentOpenUser =
        this.userId === this.authService.currentUser ? true : false;
      // console.log(this.userId);
      this.skills = [];
      this.skills = this.skillService.getSkills(this.userId);
    });
  }
  onCloseEditSkill() {
    if (this.skillName !== undefined) {
      this.skillService.addSkillToUi(this.skillName);
    }
    this.editSkills = false;
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
