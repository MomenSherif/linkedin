import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss']
})
export class ExperienceItemComponent implements OnInit {
  @Output() inEditMode = new EventEmitter<void>();

  switchToEdit() {
    this.inEditMode.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
