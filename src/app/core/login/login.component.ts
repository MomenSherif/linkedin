import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/_services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;

  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    // Listen to user state changes
    this.authService.user.subscribe(user => {
      if (user) {
        // Redirect to news feed page
        // this.router.navigate([`/news-feed`])
        console.log(`Logged in as ${user.uid}`);
      } else {
        console.log("Logged out");
      }
    });
  }

  onSubmit() {
    const { email, password } = this.signInForm.value;
    this.authService
      .login(email, password)
      .then(() => {
        this.signInForm.reset();
        this.router.navigate(["/news-feed"]);
      })
      .catch(err => alert(err.message));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
