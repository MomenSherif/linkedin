import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

import { User } from 'src/app/_models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

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

    // Listen to user state changes
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        // Redirect to news feed page
        // this.router.navigate([`/news-feed`])
        console.log(`Logged in as ${user.uid}`);
      } else {
        console.log('Logged out');
      }
    });
  }


  onSubmit() {
    const { email, password, firstName, lastName, country, postalCode } = this.signUpForm.value;
    const user: User = {
      email,
      name: `${firstName}, ${lastName}`,
      postalCode,
      address: {
        country,
        city: ''
      },
      skills: [],
      educations: [],
      company: '',
      phoneNumber: '',
      jobTitle: '',
      about: '',
      profileUrl: ''
    };
    this.authService.signUp(email, password, user)
      .then(() => {
        alert(`Welcome ${firstName} ${lastName}`);
        this.signUpForm.reset();
      })
      .catch(err => alert(err.message));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
