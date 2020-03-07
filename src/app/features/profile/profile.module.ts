import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InterestsComponent } from "./interests/interests.component";
import { SkillsComponent } from "./skills/skills.component";
import { AccomplishmentsComponent } from "./accomplishments/accomplishments.component";

@NgModule({
  declarations: [InterestsComponent, SkillsComponent, AccomplishmentsComponent],
  imports: [CommonModule],
  exports: [InterestsComponent, SkillsComponent, AccomplishmentsComponent]
})
export class ProfileModule {}
