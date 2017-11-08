import { TestBed, inject } from '@angular/core/testing';

import { TeamClinicService } from './team-clinic.service';

describe('TeamClinicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamClinicService]
    });
  });

  it('should be created', inject([TeamClinicService], (service: TeamClinicService) => {
    expect(service).toBeTruthy();
  }));
});
