import { TestBed } from '@angular/core/testing';

import { RetourExperienceService } from './retour-experience.service';

describe('RetourExperienceService', () => {
  let service: RetourExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetourExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
