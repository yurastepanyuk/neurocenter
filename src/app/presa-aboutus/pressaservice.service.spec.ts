import { TestBed, inject } from '@angular/core/testing';

import { PressaServiceService } from './pressa-service.service';

describe('PressaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PressaServiceService]
    });
  });

  it('should be created', inject([PressaServiceService], (service: PressaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
