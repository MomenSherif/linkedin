import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ExperienceSectionService } from 'src/app/shared/experience-section/experience-section.service';

@Component({
  selector: 'app-volunteer-item',
  templateUrl: './volunteer-item.component.html',
  styleUrls: ['./volunteer-item.component.scss']
})
export class VolunteerItemComponent implements OnInit {
  @Output() inEditMode = new EventEmitter<void>();
  @Input() volunteerExp;
  @Input() volunteerExpId;
  @Input() currentOpenUser;

  constructor(private experienceSectionService: ExperienceSectionService) { }

  switchToEdit() {
    this.experienceSectionService.setVolunteerExpId(this.volunteerExpId);
    this.inEditMode.emit();
  }


  ngOnInit(): void {
  }

}
