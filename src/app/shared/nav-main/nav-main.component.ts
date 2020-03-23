import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/_services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-main",
  templateUrl: "./nav-main.component.html",
  styleUrls: ["./nav-main.component.scss"]
})
export class NavMainComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch = new EventEmitter<string>();

  focus: boolean=false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  filterProducts(inputVal: string) {
    this.onSearch.next(inputVal.toLocaleLowerCase());
  }

  onLogOut() {
    this.authService.logout().then(res => {
      this.router.navigate([""]);
    });
  }
}
