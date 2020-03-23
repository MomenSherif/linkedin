import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/_services/users.service";
import { Education } from "src/app/_models/education";
import { User } from "src/app/_models/user";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"]
})
export class ProfilePageComponent implements OnInit {
  user: User;
  userId: string;
  FilteredArray: User[] = [];
  isSearching = false;
  searchFields = ["People", "Jobs", "Company", "Country"];
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Check if current user profile or other
    this.route.params.subscribe(({ id }) => {
      this.userId = id ? id : this.authService.currentUser;
    });
  }

  ngOnInit(): void {
    // console.log("user", this.userId);
    this.userService.getUserById(this.userId).subscribe(data => {
      console.log("data", data.payload.data());
      this.user = data.payload.data() as User;
      this.userService.getUserEducation(this.userId).subscribe(dataa => {
        this.user.educations = dataa.map(e =>
          e.payload.doc.data()
        ) as Education[];
      });
    });
  }
  filterProducts(inputval) {
    this.FilteredArray = this.userService.filterProducts(inputval);
    if (inputval === "") {
      this.isSearching = false;
    } else {
      this.isSearching = true;
    }
  }
  onSearchbyField(i) {
    console.log(i);
    this.FilteredArray = this.userService.ChooseField(i);
  }
}
