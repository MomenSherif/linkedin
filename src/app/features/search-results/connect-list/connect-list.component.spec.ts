import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectListComponent } from './connect-list.component';

describe('ConnectListComponent', () => {
  let component: ConnectListComponent;
  let fixture: ComponentFixture<ConnectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
