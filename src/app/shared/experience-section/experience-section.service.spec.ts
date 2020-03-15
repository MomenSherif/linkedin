import { TestBed } from '@angular/core/testing';

import { ExperienceSectionService } from './experience-section.service';

describe('ExperienceItemService', () => {
  let service: ExperienceSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienceSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
