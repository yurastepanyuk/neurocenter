import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreoperativePreparationComponent } from './preoperative-preparation.component';

describe('PreoperativePreparationComponent', () => {
  let component: PreoperativePreparationComponent;
  let fixture: ComponentFixture<PreoperativePreparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreoperativePreparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreoperativePreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
