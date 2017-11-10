import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreoperativePreparationViewComponent } from './preoperative-preparation-view.component';

describe('PreoperativePreparationViewComponent', () => {
  let component: PreoperativePreparationViewComponent;
  let fixture: ComponentFixture<PreoperativePreparationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreoperativePreparationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreoperativePreparationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
