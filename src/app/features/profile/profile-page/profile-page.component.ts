import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/_services/users.service';
import { Education } from 'src/app/_models/education';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
    
  user: User;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUserById('4Fm78GOiEUHnNO8Hr7Yh').subscribe(data => {
      this.user = data.payload.data() as User;
      this.userService
      .getUserEducation('4Fm78GOiEUHnNO8Hr7Yh')
      .subscribe(dataa => {
        this.user.educations = dataa.map(e =>
          e.payload.doc.data()
        ) as Education[];
      });
      });

  }
}
