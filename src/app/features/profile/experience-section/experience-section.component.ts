import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss']
})
export class ExperienceSectionComponent implements OnInit {

  isExperienceModalOpen = false;
  isEducationModalOpen = false;
  isVolunteerModalOpen = false;

  inEditModeExperience = false;
  inEditModeEducation = false;
  inEditModeVolunteer = false;

  constructor() { }

  toggleExperienceModal() {
    this.isExperienceModalOpen = !this.isExperienceModalOpen;
  }

  toggleEducationModal() {
    this.isEducationModalOpen = !this.isEducationModalOpen;
  }

  toggleVolunteerModal() {
    this.isVolunteerModalOpen = !this.isVolunteerModalOpen;
  }

  inExperienceEdit() {
    this.inEditModeExperience = true;
    this.toggleExperienceModal();
  }

  inExperienceAdd() {
    this.inEditModeExperience = false;
    this.toggleExperienceModal();
  }

  inEducationEdit() {
    this.inEditModeEducation = true;
    this.toggleEducationModal();
  }

  inEducationAdd() {
    this.inEditModeEducation = false;
    this.toggleEducationModal();
  }

  inVolunteerEdit() {
    this.inEditModeVolunteer = true;
    this.toggleVolunteerModal();
  }

  inVolunteerAdd() {
    this.inEditModeVolunteer = false;
    this.toggleVolunteerModal();
  }

  ngOnInit(): void {
  }

}
