import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FireLinkedinService } from "./fire-linkedin.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private fireLinked: FireLinkedinService) {}
  title = "linkedin";
  items: any[];
  ngOnInit(): void {
    //this.fireLinked.testAdd();
    this.fireLinked
      .test()
      .subscribe(res => (this.items = res[0].payload.doc.data()));
  }
}
