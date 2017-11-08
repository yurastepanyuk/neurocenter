import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamClinicListComponent } from './team-clinic-list.component';

describe('TeamClinicListComponent', () => {
  let component: TeamClinicListComponent;
  let fixture: ComponentFixture<TeamClinicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamClinicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamClinicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
