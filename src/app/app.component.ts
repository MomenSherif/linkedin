import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FireLinkedinService } from "./fire-linkedin.service";
import { SkillsService } from "./_services/skills.service";
import { Skill } from "./_models/skill";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private fireLinked: FireLinkedinService,
    private skillService: SkillsService
  ) {}
  title = "linkedin";
  items: Skill[];
  ngOnInit(): void {
    // this.fireLinked.testAdd();
    //this.items = this.fireLinked.test();
    //this.items = this.skillService.getSkills();
    // this.fireLinked
    //   .test()
    //   .subscribe(res => (this.items = res[0].payload.doc.data()));
  }
}
