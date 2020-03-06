import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ExperienceFormModalComponent } from './experience-form-modal/experience-form-modal.component';



@NgModule({
  declarations: [ExperienceFormModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExperienceFormModalComponent,
  ]
})
export class ProfileModule { }
