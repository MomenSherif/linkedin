import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFormModalComponent } from './about-form-modal.component';

describe('AboutFormModalComponent', () => {
  let component: AboutFormModalComponent;
  let fixture: ComponentFixture<AboutFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
