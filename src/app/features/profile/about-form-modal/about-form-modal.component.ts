import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-about-form-modal',
  templateUrl: './about-form-modal.component.html',
  styleUrls: ['./about-form-modal.component.scss']
})
export class AboutFormModalComponent implements OnInit {
  @Output() modalClosing = new EventEmitter<void>();
  inEditMode = false;

  form = this.fb.group({
    about: [null]
  });



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onClose() {
    this.modalClosing.emit();
    console.log(this.form.value);
  }

  onSubmit() {
    console.log(this.form.value);
    this.onClose();
  }
}
