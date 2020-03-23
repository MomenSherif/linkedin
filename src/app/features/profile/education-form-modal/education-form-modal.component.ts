import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Validators, FormBuilder, FormControl } from "@angular/forms";
import { ExperienceSectionService } from 'src/app/shared/experience-section/experience-section.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: "app-education-form-modal",
  templateUrl: "./education-form-modal.component.html",
  styleUrls: ["./education-form-modal.component.scss"]
})
export class EducationFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  @Input() inEditMode: boolean;

  userId = "";
  currentOpenUser: boolean = true;

  education;
  educationId;

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  years: number[] = [];

  form = this.fb.group({
    school: [null, Validators.required],
    degree: [null],
    fieldOfStudy: [null],
    grade: [null],
    startYear: [null, Validators.required],
    endYear: [null, Validators.required],
    description: [null]
  });

  constructor(
    private fb: FormBuilder,
    private experienceSectionService: ExperienceSectionService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if current user profile or other
    this.route.params.subscribe(({ id }) => {
      this.userId = id ? id : this.authService.currentUser;
      this.currentOpenUser =
        this.userId === this.authService.currentUser ? true : false;
    });

    // Add years till current year
    let currentYear = new Date().getFullYear() + 7;
    const startYear = 1900;
    while (currentYear >= startYear) {
      this.years.push(currentYear--);
    }

    if(this.inEditMode) {
      this.educationId = this.experienceSectionService.educationId;
      this.getEducationById(this.userId);
    }
  }

  getEducationById = (userId) => {
    this.experienceSectionService
    .getEducationById(this.educationId, userId)
    .subscribe(res => {
      this.education = res.payload.data();

      this.form = this.fb.group({
        school: [this.education.school, Validators.required],
        degree: [this.education.degree],
        fieldOfStudy: [this.education.fieldOfStudy],
        grade: [this.education.grade],
        startYear: [this.education.startYear, Validators.required],
        endYear: [this.education.endYear, Validators.required],
        description: [this.education.description]
      });
    });
  }

  onClose() {
    this.modalClosing.emit();
  }

  onSubmit() {
    if (this.inEditMode) {
      this.experienceSectionService.updateEducation(this.form.value, this.userId);
    } else {
      this.experienceSectionService
        .addEducation(this.form.value, this.userId)
        .then(res => {});
    }

    this.onClose();
  }

  onDelete() {
    this.experienceSectionService.deleteEducation(this.userId);
    this.onClose();
  }

  // Properties getter for Validation styles
  get school(): FormControl {
    return this.form.get("school") as FormControl;
  }

  get startYear(): FormControl {
    return this.form.get("startYear") as FormControl;
  }

  get endYear(): FormControl {
    return this.form.get("endYear") as FormControl;
  }
}
