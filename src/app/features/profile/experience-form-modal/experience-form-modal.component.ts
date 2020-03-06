import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-experience-form-modal',
  templateUrl: './experience-form-modal.component.html',
  styleUrls: ['./experience-form-modal.component.scss']
})
export class ExperienceFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  inEditMode = false;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [];

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



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Add & remove end date validation depend on CurrentlyWokring State
    this.form.get('currentlyWorking').valueChanges
      .subscribe(currentlyWorking => {
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
    console.log(this.years);
  }

  onSubmit() {
    console.log(this.form.value);
    this.onClose();
  }


  // Properties getter for Validation styles
  get currentlyWorking(): FormControl {
    return this.form.get('currentlyWorking') as FormControl;
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get company(): FormControl {
    return this.form.get('company') as FormControl;
  }

  get startDateMonth(): FormControl {
    return this.form.get('startDate.month') as FormControl;
  }

  get endDateMonth(): FormControl {
    return this.form.get('endDate.month') as FormControl;
  }

  get startDateYear(): FormControl {
    return this.form.get('startDate.year') as FormControl;
  }

  get endDateYear(): FormControl {
    return this.form.get('endDate.year') as FormControl;
  }
}
