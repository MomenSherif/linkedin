import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder, FormControl } from "@angular/forms";
import { Project } from "src/app/_models/project";

@Component({
  selector: "app-project-form-modal",
  templateUrl: "./project-form-modal.component.html",
  styleUrls: ["./project-form-modal.component.scss"]
})
export class ProjectFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<Project>();
  inEditMode = false;

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

  educations = ["Education 1", "Education 2", "Education 3"];

  form = this.fb.group({
    name: [null, Validators.required],
    currentlyWorking: [true],
    startDate: this.fb.group({
      month: [null, Validators.required],
      year: [null, Validators.required]
    }),
    endDate: this.fb.group({
      month: [null],
      year: [null]
    }),
    associatedWith: [null],
    projectUrl: [null, Validators.pattern("(^http[s]?:/{2})|(^www)|(^/{1,2})")],
    description: [null]
  });

  constructor(private fb: FormBuilder) {}

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
  }

  onClose() {
    this.modalClosing.emit();
  }

  onSubmit() {
    console.log(this.form.value);
    this.formSubmitted.emit(this.form.value);
    this.onClose();
  }

  // Properties getter for Validation styles
  get currentlyWorking(): FormControl {
    return this.form.get("currentlyWorking") as FormControl;
  }

  get name(): FormControl {
    return this.form.get("name") as FormControl;
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

  get projectUrl(): FormControl {
    return this.form.get("projectUrl") as FormControl;
  }
}
