import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-interests",
  templateUrl: "./interests.component.html",
  styleUrls: ["./interests.component.scss"]
})
export class InterestsComponent implements OnInit {
  allIntrestsOpened: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onAllIntresetsOpen() {
    console.log("hii");
    this.allIntrestsOpened = true;
  }
  onAllIntresetsClosed() {
    this.allIntrestsOpened = false;
  }
}
