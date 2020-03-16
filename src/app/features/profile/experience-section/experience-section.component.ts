import { Component, OnInit } from "@angular/core";
import { ExperienceSectionService } from "src/app/shared/experience-section/experience-section.service";

@Component({
  selector: "app-experience-section",
  templateUrl: "./experience-section.component.html",
  styleUrls: ["./experience-section.component.scss"]
})
export class ExperienceSectionComponent implements OnInit {
  isExperienceModalOpen = false;
  isEducationModalOpen = false;
  isVolunteerModalOpen = false;

  inEditModeExperience = false;
  inEditModeEducation = false;
  inEditModeVolunteer = false;

  experiences;
  educations;
  volunteerExps;

  constructor(private experienceSectionService: ExperienceSectionService) {}

  ngOnInit(): void {
    this.getExperiences();
    this.getEducations();
    this.getVolunteerExps();
  }

  getExperiences = () => {
    this.experienceSectionService.getExperiences().subscribe(
      res => (this.experiences = res)
    );
  }

  getEducations = () => {
    this.experienceSectionService.getEducations().subscribe(
      res => (this.educations = res)
    )
  }

  getVolunteerExps = () => {
    this.experienceSectionService.getVolunteerExps().subscribe(
      res => (this.volunteerExps = res)
    )
  }

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
}
