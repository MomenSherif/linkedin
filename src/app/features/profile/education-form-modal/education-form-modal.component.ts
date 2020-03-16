import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Validators, FormBuilder, FormControl } from "@angular/forms";
import { ExperienceSectionService } from 'src/app/shared/experience-section/experience-section.service';

@Component({
  selector: "app-education-form-modal",
  templateUrl: "./education-form-modal.component.html",
  styleUrls: ["./education-form-modal.component.scss"]
})
export class EducationFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  @Input() inEditMode: boolean;

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
    private experienceSectionService: ExperienceSectionService
  ) {}

  ngOnInit(): void {
    // Add years till current year
    let currentYear = new Date().getFullYear() + 7;
    const startYear = 1900;
    while (currentYear >= startYear) {
      this.years.push(currentYear--);
    }

    if(this.inEditMode) {
      this.educationId = this.experienceSectionService.educationId;
      this.getEducationById();
    }
  }

  getEducationById = () => {
    this.experienceSectionService
    .getEducationById(this.educationId)
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
      this.experienceSectionService.updateEducation(this.form.value);
    } else {
      this.experienceSectionService
        .addEducation(this.form.value)
        .then(res => {});
    }

    this.onClose();
  }

  onDelete() {
    this.experienceSectionService.deleteEducation();
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
