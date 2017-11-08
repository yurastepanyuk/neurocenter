import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamClinicViewComponent } from './team-clinic-view.component';

describe('TeamClinicViewComponent', () => {
  let component: TeamClinicViewComponent;
  let fixture: ComponentFixture<TeamClinicViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamClinicViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamClinicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
