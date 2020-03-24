import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { NavMainComponent } from "./nav-main/nav-main.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from '../core/footer/footer.component';
import { CopyrightComponent } from '../core/copyright/copyright.component';

@NgModule({
  declarations: [
    DropdownComponent,
    NavMainComponent,
    FooterComponent,
    CopyrightComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DropdownComponent,
    NavMainComponent,
    FooterComponent,
    CopyrightComponent
  ]
})
export class SharedModule {}
