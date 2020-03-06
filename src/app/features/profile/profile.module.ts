import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ExperienceFormModalComponent } from './experience-form-modal/experience-form-modal.component';
import { EducationFormModalComponent } from './education-form-modal/education-form-modal.component';
import { VolunteerFormModalComponent } from './volunteer-form-modal/volunteer-form-modal.component';
import { ProjectFormModalComponent } from './project-form-modal/project-form-modal.component';



@NgModule({
  declarations: [ExperienceFormModalComponent, EducationFormModalComponent, VolunteerFormModalComponent, ProjectFormModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExperienceFormModalComponent,
    EducationFormModalComponent,
    VolunteerFormModalComponent,
    ProjectFormModalComponent,
  ]
})
export class ProfileModule { }
