import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ExperienceSectionService } from 'src/app/shared/experience-section/experience-section.service';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss']
})
export class ExperienceItemComponent implements OnInit {
  @Output() inEditMode = new EventEmitter<void>();
  @Input() experience;
  @Input() experienceId;


  constructor(private experienceSectionService: ExperienceSectionService) {}

  ngOnInit(): void {
  }

  switchToEdit() {
    this.experienceSectionService.setExperienceId(this.experienceId);
    this.inEditMode.emit();
    // this.experienceSectionService.updateExperience(this.experienceId);
  }



}
