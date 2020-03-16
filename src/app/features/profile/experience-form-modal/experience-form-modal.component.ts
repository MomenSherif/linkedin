import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ExperienceSectionService } from "src/app/shared/experience-section/experience-section.service";

@Component({
  selector: "app-experience-form-modal",
  templateUrl: "./experience-form-modal.component.html",
  styleUrls: ["./experience-form-modal.component.scss"]
})
export class ExperienceFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  @Input() inEditMode: boolean;

  experience;
  experienceId;

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

  employmentTypes = [
    "Full-time",
    "part-time",
    "Self-employed",
    "Freelance",
    "Contract",
    "Internship",
    "Apprenticeship"
  ];

  form = this.fb.group({
    title: [null, Validators.required],
    employmentType: [null],
    company: [null, Validators.required],
    location: [null],
    currentlyWorking: [true],
    startDate: this.fb.group({
      month: [null, Validators.required],
      year: [null, Validators.required]
    }),
    endDate: this.fb.group({
      month: [null],
      year: [null]
    }),
    description: [null]
  });

  constructor(
    private fb: FormBuilder,
    private experienceSectionService: ExperienceSectionService
  ) {}

  ngOnInit(): void {
    // Add & remove end date validation depend on CurrentlyWokring State
    this.form
      .get("currentlyWorking")
      .valueChanges.subscribe(currentlyWorking => {
        if (currentlyWorking) {
          this.endDateMonth.clearValidators();
          this.endDateYear.clearValidators();
          this.endDateMonth.setValue(null);
          this.endDateYear.setValue(null);
        } else {
          this.endDateMonth.setValidators([Validators.required]);
          this.endDateYear.setValidators([Validators.required]);
        }

        this.endDateMonth.updateValueAndValidity();
        this.endDateYear.updateValueAndValidity();
      });

    // Add years till current year
    let currentYear = new Date().getFullYear();
    const startYear = 1900;
    while (currentYear >= startYear) {
      this.years.push(currentYear--);
    }

    if (this.inEditMode) {
      this.experienceId = this.experienceSectionService.experienceId;
      this.getExperienceById();
    }
  }

  getExperienceById = () => {
    this.experienceSectionService
      .getExperienceById(this.experienceId)
      .subscribe(res => {
        this.experience = res.payload.data();

        this.form = this.fb.group({
          title: [this.experience.title, Validators.required],
          employmentType: [this.experience.employmentType],
          company: [this.experience.company, Validators.required],
          location: [this.experience.location],
          currentlyWorking: [this.experience.currentlyWorking],
          startDate: this.fb.group({
            month: [this.experience.startDate.month, Validators.required],
            year: [this.experience.startDate.year, Validators.required]
          }),
          endDate: this.fb.group({
            month: [this.experience.endDate.month],
            year: [this.experience.endDate.year]
          }),
          description: [this.experience.description]
        });
      });
  };

  onClose() {
    this.modalClosing.emit();
  }

  onSubmit() {
    if (this.inEditMode) {
      this.experienceSectionService.updateExperience(this.form.value);
    } else {
      this.experienceSectionService
        .addExperience(this.form.value)
        .then(res => {});
    }

    this.onClose();
  }

  onDelete() {
    this.experienceSectionService.deleteExperience();
    this.onClose();
  }

  // Properties getter for Validation styles
  get currentlyWorking(): FormControl {
    return this.form.get("currentlyWorking") as FormControl;
  }

  get title(): FormControl {
    return this.form.get("title") as FormControl;
  }

  get company(): FormControl {
    return this.form.get("company") as FormControl;
  }

  get startDateMonth(): FormControl {
    return this.form.get("startDate.month") as FormControl;
  }

  get endDateMonth(): FormControl {
    return this.form.get("endDate.month") as FormControl;
  }

  get startDateYear(): FormControl {
    return this.form.get("startDate.year") as FormControl;
  }

  get endDateYear(): FormControl {
    return this.form.get("endDate.year") as FormControl;
  }
}
