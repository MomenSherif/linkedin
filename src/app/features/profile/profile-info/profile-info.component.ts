import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
isopenedintro = true;


contactinfo = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleClass() {
    this.isopenedintro = !this.isopenedintro;
  }



}
