import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamClinicEditComponent } from './team-clinic-edit.component';

describe('TeamClinicEditComponent', () => {
  let component: TeamClinicEditComponent;
  let fixture: ComponentFixture<TeamClinicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamClinicEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamClinicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
