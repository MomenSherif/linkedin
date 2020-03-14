import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  isopenedintro = true;

  contactinfo = false;
  display = 'none';
  @Input() user: User;
  constructor() {}

  ngOnInit(): void {


  }
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
