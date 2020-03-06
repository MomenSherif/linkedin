import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-education-form-modal',
  templateUrl: './education-form-modal.component.html',
  styleUrls: ['./education-form-modal.component.scss']
})
export class EducationFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  inEditMode = false;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Add years till current year
    let currentYear = new Date().getFullYear() + 7;
    const startYear = 1980;
    while (currentYear >= startYear) {
      this.years.push(currentYear--);
    }
  }

  onClose() {
    this.modalClosing.emit();
  }

  onSubmit() {
    console.log(this.form.value);
    this.onClose();
  }


  // Properties getter for Validation styles
  get school(): FormControl {
    return this.form.get('school') as FormControl;
  }

  get startYear(): FormControl {
    return this.form.get('startYear') as FormControl;
  }

  get endYear(): FormControl {
    return this.form.get('endYear') as FormControl;
  }
}
