import { Component, OnInit } from "@angular/core";
import { SkillsService } from "src/app/_services/skills.service";
import { Skill } from "src/app/_models/skill";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { UsersService } from "src/app/_services/users.service";

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
  addEndorsment: boolean[] = [];
  removeEndorsment: boolean[] = [];
  currentEditingEndo: number = 0;
  endorsedBy: { name: string; endors: string[] }[] = [];
  currentUser: string;
  userNames: string[] = [];
  constructor(
    private skillService: SkillsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.route.params.subscribe(({ id }) => {
      this.userId = id ? id : this.authService.currentUser;
      this.currentOpenUser =
        this.userId === this.authService.currentUser ? true : false;
      console.log(this.userId);
      this.skillService.getUserSkills(this.userId).subscribe(snapshot => {
        this.skills = [];
        snapshot.forEach(snap => {
          this.skills.push({ name: snap.payload.doc.data()["name"] });
          this.addEndorsment.push(false);
          this.removeEndorsment.push(true);
        });
      });
      this.skillService.getEndorsedBy(this.userId).subscribe(snapshot => {
        this.endorsedBy = [];
        snapshot.forEach(snap => {
          if (snap.payload.doc.data()["endorsedBy"] !== undefined) {
            this.endorsedBy.push({
              name: snap.payload.doc.data()["name"],
              endors: snap.payload.doc.data()["endorsedBy"]
            });
          } else {
            this.endorsedBy.push({
              name: snap.payload.doc.data()["name"],
              endors: []
            });
          }
        });
        for (let i = 0; i < this.endorsedBy.length; i++) {
          this.getUserId(this.endorsedBy[i]?.endors[0]);
        }
      });
      console.log(this.userNames);
     
    });
  }
  onCloseEditSkill() {
    if (this.skillName !== undefined) {
      this.skills.push(this.skillName);
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

  onAddEndors(skill: Skill) {
    this.addEndorsment[this.currentEditingEndo] = true;
    this.removeEndorsment[this.currentEditingEndo] = false;
    this.skillService.addEndorsement(this.userId, skill);
  }
  onRemoveEndors(skill: Skill) {
    this.removeEndorsment[this.currentEditingEndo] = true;
    this.addEndorsment[this.currentEditingEndo] = false;
    this.skillService.deleteEndorsement(this.userId, skill);
  }
  onAddNewSkill(skillName: string) {
    this.skills.forEach(sk => {
      if (sk.name === skillName) {
        this.skillAlreadeyExist = true;
      }
    });
    if (!this.skillAlreadeyExist) {
      this.addSkill = false;
      this.skillService.addUserSkill({ name: skillName });
    }
  }
  onDeleteSkill(skill: Skill) {
    this.skillName = skill;
    let index = this.skills.findIndex(sk => sk.name === skill.name);
    this.skills.splice(index, 1);
  }
  onDeleteSkillDb() {
    if (this.skillName !== undefined) {
      this.skillService.deleteUserSkill(this.skillName);
    }
    this.editSkills = false;
  }

  getUserId(userId: string) {
    if (userId !== undefined) {
      this.skillService.getUserById(userId).subscribe(snapshot => {
        this.userNames.push(snapshot.data()["name"]);
      });
    }
  }
}
