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

  ngOnInit(): void {
  }

}
