import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  editAbout = false;
  display = 'none';

  constructor() { }


  ngOnInit(): void {
  }
  onEditAbout() {
    this.editAbout = true;
    this.display = 'block';

  }
  onCloseEditAbout() {
    this.editAbout = false;
    this.display = 'none';

  }
}
