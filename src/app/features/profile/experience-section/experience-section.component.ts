import { Component, OnInit } from "@angular/core";
import { ExperienceSectionService } from "src/app/shared/experience-section/experience-section.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-experience-section",
  templateUrl: "./experience-section.component.html",
  styleUrls: ["./experience-section.component.scss"]
})
export class ExperienceSectionComponent implements OnInit {
  userId = "";
  currentOpenUser: boolean = true;

  isExperienceModalOpen = false;
  isEducationModalOpen = false;
  isVolunteerModalOpen = false;

  inEditModeExperience = false;
  inEditModeEducation = false;
  inEditModeVolunteer = false;

  experiences;
  educations;
  volunteerExps;

  constructor(
    private experienceSectionService: ExperienceSectionService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    // Check if current user profile or other
    this.route.params.subscribe(({ id }) => {
      this.userId = id ? id : this.authService.currentUser;
      this.currentOpenUser =
        this.userId === this.authService.currentUser ? true : false;
      // console.log("Id in URL", this.userId);
      // console.log("current open user", this.currentOpenUser);
    });

    this.getExperiences(this.userId);
    this.getEducations(this.userId);
    this.getVolunteerExps(this.userId);
  }

  getExperiences = (userId) => {
    this.experienceSectionService
      .getExperiences(userId)
      .subscribe(res => (this.experiences = res));
  };

  getEducations = (userId) => {
    this.experienceSectionService
      .getEducations(userId)
      .subscribe(res => (this.educations = res));
  };

  getVolunteerExps = (userId) => {
    this.experienceSectionService
      .getVolunteerExps(userId)
      .subscribe(res => (this.volunteerExps = res));
  };

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
