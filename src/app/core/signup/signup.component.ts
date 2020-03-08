import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      country: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    console.log(this.signUpForm);
  }
}
