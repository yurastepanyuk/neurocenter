import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresaAboutusComponent } from './presa-aboutus.component';

describe('PresaAboutusComponent', () => {
  let component: PresaAboutusComponent;
  let fixture: ComponentFixture<PresaAboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresaAboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresaAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
