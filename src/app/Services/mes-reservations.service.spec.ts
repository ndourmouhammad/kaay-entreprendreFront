import { TestBed } from '@angular/core/testing';

import { MesReservationsService } from './mes-reservations.service';

describe('MesReservationsService', () => {
  let service: MesReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
