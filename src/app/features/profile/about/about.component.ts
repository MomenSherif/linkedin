import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { User } from '../../../_models/user';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../_services/users.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  editAbout = false;
  display = 'none';
  @Input() user: User;
  constructor(private userService: UsersService, private fb: FormBuilder) { }
  form = this.fb.group({
    about: ['']
  });

  ngOnInit(): void {

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
