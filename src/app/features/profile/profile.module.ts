import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { SearchResultsModule } from '../search-results/search-results.module';

import { ExperienceFormModalComponent } from './experience-form-modal/experience-form-modal.component';
import { EducationFormModalComponent } from './education-form-modal/education-form-modal.component';
import { VolunteerFormModalComponent } from './volunteer-form-modal/volunteer-form-modal.component';
import { ProjectFormModalComponent } from './project-form-modal/project-form-modal.component';
import { AboutFormModalComponent } from './about-form-modal/about-form-modal.component';
import { AccomplishmentsComponent } from './accomplishments/accomplishments.component';
import { InterestsComponent } from './interests/interests.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { EducationItemComponent } from './education-item/education-item.component';
import { VolunteerItemComponent } from './volunteer-item/volunteer-item.component';
import { AboutComponent } from './about/about.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    ExperienceFormModalComponent,
    EducationFormModalComponent,
    VolunteerFormModalComponent,
    ProjectFormModalComponent,
    AboutFormModalComponent,
    InterestsComponent,
    SkillsComponent,
    AccomplishmentsComponent,
    InterestsComponent,
    SkillsComponent,
    AccomplishmentsComponent,
    ExperienceSectionComponent,
    ExperienceItemComponent,
    EducationItemComponent,
    VolunteerItemComponent,
    ProfileInfoComponent,
    AboutComponent,
    ProfilePageComponent
    // NavMainComponent
  ],
  imports: [
  CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ProfileRoutingModule,
    SearchResultsModule
  ],
  exports: []
})
export class ProfileModule { }
