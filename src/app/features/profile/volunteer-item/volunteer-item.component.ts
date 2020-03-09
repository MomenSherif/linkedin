import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-volunteer-item',
  templateUrl: './volunteer-item.component.html',
  styleUrls: ['./volunteer-item.component.scss']
})
export class VolunteerItemComponent implements OnInit {
  @Output() inEditMode = new EventEmitter<void>();

  switchToEdit() {
    this.inEditMode.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
