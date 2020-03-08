import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  isopenedintro = true;

  contactinfo = false;
  display = 'none';
  constructor() {}

  ngOnInit(): void {}
  toggleClass() {
    this.isopenedintro = !this.isopenedintro;
  }

  onOpenContactModal() {
    this.contactinfo = !this.contactinfo;
    this.display = 'block';
  }
  onCloseContactModal() {
    this.contactinfo = !this.contactinfo;
    this.display = 'none';
  }
}
