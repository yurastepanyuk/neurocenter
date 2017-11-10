import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreoperativePreparationListComponent } from './preoperative-preparation-list.component';

describe('PreoperativePreparationListComponent', () => {
  let component: PreoperativePreparationListComponent;
  let fixture: ComponentFixture<PreoperativePreparationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreoperativePreparationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreoperativePreparationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
