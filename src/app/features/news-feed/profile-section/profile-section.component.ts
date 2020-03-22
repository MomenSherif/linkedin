import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/_models/user";
import { AuthService } from "src/app/_services/auth.service";
import { UsersService } from "src/app/_services/users.service";

@Component({
  selector: "app-profile-section",
  templateUrl: "./profile-section.component.html",
  styleUrls: ["./profile-section.component.scss"]
})
export class ProfileSectionComponent implements OnInit {
  currentUser: string;
  user: User;
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.currentUser = id ? id : this.authService.currentUser;
      this.userService.getUserById(this.currentUser).subscribe(data => {
        this.user = data.payload.data() as User;
      });
    });
  }
}
