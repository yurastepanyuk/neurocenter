import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressaCurObjectComponent } from './pressa-cur-object.component';

describe('PressaCurObjectComponent', () => {
  let component: PressaCurObjectComponent;
  let fixture: ComponentFixture<PressaCurObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressaCurObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressaCurObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
