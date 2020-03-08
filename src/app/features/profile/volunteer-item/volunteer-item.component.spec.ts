import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerItemComponent } from './volunteer-item.component';

describe('VolunteerItemComponent', () => {
  let component: VolunteerItemComponent;
  let fixture: ComponentFixture<VolunteerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
