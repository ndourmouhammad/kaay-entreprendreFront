import { TestBed } from '@angular/core/testing';

import { DemandeServiceTsService } from './demande.service.ts.service';

describe('DemandeServiceTsService', () => {
  let service: DemandeServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
