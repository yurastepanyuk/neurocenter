import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineConsultationComponent } from './online-consultation.component';

describe('OnlineConsultationComponent', () => {
  let component: OnlineConsultationComponent;
  let fixture: ComponentFixture<OnlineConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
