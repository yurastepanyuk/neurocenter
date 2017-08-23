import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCenterComponent } from './main-center.component';

describe('MainCenterComponent', () => {
  let component: MainCenterComponent;
  let fixture: ComponentFixture<MainCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
