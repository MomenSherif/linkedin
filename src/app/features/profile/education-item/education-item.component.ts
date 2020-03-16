import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ExperienceSectionService } from 'src/app/shared/experience-section/experience-section.service';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss']
})
export class EducationItemComponent implements OnInit {
  @Output() inEditMode = new EventEmitter<void>();
  @Input() education;
  @Input() educationId;

  constructor(private experienceSectionService: ExperienceSectionService) {}

  switchToEdit() {
    this.experienceSectionService.setEducationId(this.educationId);
    this.inEditMode.emit();
  }


  ngOnInit(): void {
  }

}
