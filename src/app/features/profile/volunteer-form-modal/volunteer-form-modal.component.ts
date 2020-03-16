import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Validators, FormBuilder, FormControl } from "@angular/forms";
import { ExperienceSectionService } from "src/app/shared/experience-section/experience-section.service";

@Component({
  selector: "app-volunteer-form-modal",
  templateUrl: "./volunteer-form-modal.component.html",
  styleUrls: ["./volunteer-form-modal.component.scss"]
})
export class VolunteerFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  @Input() inEditMode: boolean;

  volunteerExp;
  volunteerExpId;

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
    organization: [null, Validators.required],
    role: [null, Validators.required],
    currentlyVolunteering: [true],
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
      .get("currentlyVolunteering")
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
      this.volunteerExpId = this.experienceSectionService.volunteerExpId;
      this.getVolunteerExpById();
    }
  }

  getVolunteerExpById() {
    this.experienceSectionService
    .getVolunteerExpById(this.volunteerExpId)
    .subscribe(res => {
      this.volunteerExp = res.payload.data();

      this.form = this.fb.group({
        organization: [this.volunteerExp.organization, Validators.required],
        role: [this.volunteerExp.role, Validators.required],
        currentlyVolunteering: [this.volunteerExp.currentlyVolunteering],
        startDate: this.fb.group({
          month: [this.volunteerExp.startDate.month, Validators.required],
          year: [this.volunteerExp.startDate.year, Validators.required]
        }),
        endDate: this.fb.group({
          month: [this.volunteerExp.endDate.month],
          year: [this.volunteerExp.endDate.year]
        }),
        description: [this.volunteerExp.description]
      });
    });
  }

  onClose() {
    this.modalClosing.emit();
  }

  onSubmit() {
    if (this.inEditMode) {
      this.experienceSectionService.updateVolunteerExp(this.form.value);
    } else {
      this.experienceSectionService
        .addVolunteerExp(this.form.value)
        .then(res => {});
    }

    this.onClose();
  }

  onDelete() {
    this.experienceSectionService.deleteVolunteerExp();
    this.onClose();
  }

  // Properties getter for Validation styles
  get currentlyVolunteering(): FormControl {
    return this.form.get("currentlyVolunteering") as FormControl;
  }

  get organization(): FormControl {
    return this.form.get("organization") as FormControl;
  }

  get role(): FormControl {
    return this.form.get("role") as FormControl;
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
