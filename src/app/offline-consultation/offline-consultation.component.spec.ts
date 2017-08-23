import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineConsultationComponent } from './offline-consultation.component';

describe('OfflineConsultationComponent', () => {
  let component: OfflineConsultationComponent;
  let fixture: ComponentFixture<OfflineConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
