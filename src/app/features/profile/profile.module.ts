import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InterestsComponent } from "./interests/interests.component";
import { SkillsComponent } from "./skills/skills.component";

@NgModule({
  declarations: [InterestsComponent, SkillsComponent],
  imports: [CommonModule],
  exports: [InterestsComponent, SkillsComponent]
})
export class ProfileModule {}
