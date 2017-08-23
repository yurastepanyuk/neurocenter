import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsOurComponent } from './contacts-our.component';

describe('ContactsOurComponent', () => {
  let component: ContactsOurComponent;
  let fixture: ComponentFixture<ContactsOurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsOurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsOurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
