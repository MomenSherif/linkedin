import { Project } from "./../../../_models/project";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";
import { AuthService } from "src/app/_services/auth.service";
import { SkillsService } from "src/app/_services/skills.service";
import { UsersService } from "src/app/_services/users.service";

@Component({
  selector: "app-project-form-modal",
  templateUrl: "./project-form-modal.component.html",
  styleUrls: ["./project-form-modal.component.scss"]
})
export class ProjectFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<Project>();
  @Output() deletedProj = new EventEmitter<Project>();
  @Input() project: Project;
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

  educations: string[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserEducation(this.authService.currentUser)
      .subscribe(snapshot => {
        snapshot.forEach(snap => {
          this.educations.push(snap.payload.doc.data()["school"]);
        });
      });

    // Add & remove end date validation depend on CurrentlyWokring State
    if (this.project === null) {
      this.inEditMode = false;
      this.form = this.fb.group({
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
        projectUrl: [
          null,
          Validators.pattern("(^http[s]?:/{2})|(^www)|(^/{1,2})")
        ],
        description: [null]
      });
    } else {
      this.inEditMode = true;
      this.form = this.fb.group({
        name: [this.project.name, Validators.required],
        currentlyWorking: [this.project.currentlyWorking],
        startDate: this.fb.group({
          month: [+this.project.startDate.month, Validators.required],
          year: [+this.project.startDate.year, Validators.required]
        }),
        endDate: this.fb.group({
          month: [+this.project.endDate?.month],
          year: [+this.project.endDate?.year]
        }),
        associatedWith: [this.project.associatedWith],
        projectUrl: [
          this.project.projectUrl,
          Validators.pattern("(^http[s]?:/{2})|(^www)|(^/{1,2})")
        ],
        description: [this.project.description]
      });
    }
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
    console.log("Closed");
    this.modalClosing.emit();
  }

  onSubmit() {
    console.log(this.form.value);
    this.formSubmitted.emit(this.form.value);
    this.onClose();
  }

  deleteProj() {
    this.deletedProj.emit(this.project);
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
