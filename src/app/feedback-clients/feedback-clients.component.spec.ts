import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackClientsComponent } from './feedback-clients.component';

describe('FeedbackClientsComponent', () => {
  let component: FeedbackClientsComponent;
  let fixture: ComponentFixture<FeedbackClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
