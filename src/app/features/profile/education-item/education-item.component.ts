import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss']
})
export class EducationItemComponent implements OnInit {
  @Output() inEditMode = new EventEmitter<void>();

  switchToEdit() {
    this.inEditMode.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
