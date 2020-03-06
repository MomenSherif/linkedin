import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InterestsComponent } from "./interests/interests.component";

@NgModule({
  declarations: [InterestsComponent],
  imports: [CommonModule],
  exports: [InterestsComponent]
})
export class ProfileModule {}
