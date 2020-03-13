import { Component, OnInit } from "@angular/core";
import { InterestsService } from "src/app/_services/interests.service";
import { InterestsCompanies } from "src/app/_models/interests-company";

@Component({
  selector: "app-interests",
  templateUrl: "./interests.component.html",
  styleUrls: ["./interests.component.scss"]
})
export class InterestsComponent implements OnInit {
  allIntrestsOpened: boolean = false;
  interestCompanies: InterestsCompanies[] = [];
  constructor(private interestService: InterestsService) {}

  ngOnInit(): void {
    this.interestCompanies = this.interestService.getInterestsCompanies();
    console.log(this.interestCompanies);
  }

  onAllIntresetsOpen() {
    this.allIntrestsOpened = true;
  }
  onAllIntresetsClosed() {
    this.allIntrestsOpened = false;
  }
}
