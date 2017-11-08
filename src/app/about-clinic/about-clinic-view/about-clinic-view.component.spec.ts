import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutClinicViewComponent } from './about-clinic-view.component';

describe('AboutClinicViewComponent', () => {
  let component: AboutClinicViewComponent;
  let fixture: ComponentFixture<AboutClinicViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutClinicViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutClinicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
