import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutClinicComponent } from './about-clinic.component';

describe('AboutClinicComponent', () => {
  let component: AboutClinicComponent;
  let fixture: ComponentFixture<AboutClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
