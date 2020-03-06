import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationFormModalComponent } from './education-form-modal.component';

describe('EducationFormModalComponent', () => {
  let component: EducationFormModalComponent;
  let fixture: ComponentFixture<EducationFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
