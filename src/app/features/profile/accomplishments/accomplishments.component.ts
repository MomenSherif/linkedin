import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-accomplishments",
  templateUrl: "./accomplishments.component.html",
  styleUrls: ["./accomplishments.component.scss"]
})
export class AccomplishmentsComponent implements OnInit {
  editAccom: boolean[] = [false, false, false];
  notEditAccom: boolean[] = [true, true, true];
  currentEditing: number = 0;
  constructor() {}

  ngOnInit(): void {}
  onEditAccom() {
    this.editAccom[this.currentEditing] = true;
    this.notEditAccom[this.currentEditing] = false;
    console.log(this.currentEditing);
  }
  cancelEditAccom() {
    this.editAccom[this.currentEditing] = false;
    this.notEditAccom[this.currentEditing] = true;
  }
}
