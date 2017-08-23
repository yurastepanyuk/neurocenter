import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamClinicComponent } from './team-clinic.component';

describe('TeamClinicComponent', () => {
  let component: TeamClinicComponent;
  let fixture: ComponentFixture<TeamClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
