import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { User } from '../../../_models/user';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../_services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  editAbout = false;
  display = 'none';
  @Input() user: User;
  currentOpenUser = true;
  userId = '';
  constructor(private userService: UsersService, private fb: FormBuilder, 
              private route: ActivatedRoute, private authService: AuthService) { }
  form = this.fb.group({
    about: ['']
  });

  ngOnInit(): void {
 // Check if current user profile or other
 this.route.params.subscribe(({ id }) => {
  this.userId = id ? id : this.authService.currentUser;
  this.currentOpenUser =
    this.userId === this.authService.currentUser ? true : false;
});
  }
  onEditAbout() {
    this.form.patchValue(
      {
        about: this.user.about
      }
    );
    this.editAbout = true;
    this.display = 'block';

  }
  onCloseEditAbout() {
    this.editAbout = false;
    this.display = 'none';

  }
  onSubmit() {
    this.user.about = this.form.value.about;
    this.userService.updateUser(this.user);
    this.onCloseEditAbout();
  }
}
