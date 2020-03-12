import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NavMainComponent } from './nav-main/nav-main.component';

@NgModule({
  declarations: [
    DropdownComponent,
    NavMainComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownComponent,
    NavMainComponent
  ]
})
export class SharedModule { }
