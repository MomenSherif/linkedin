import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceFormModalComponent } from './experience-form-modal.component';

describe('ExperienceFormModalComponent', () => {
  let component: ExperienceFormModalComponent;
  let fixture: ComponentFixture<ExperienceFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
