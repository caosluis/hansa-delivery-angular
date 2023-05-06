import { TestBed } from '@angular/core/testing';

import { MetodoPagosService } from './metodo-pagos.service';

describe('MetodoPagosService', () => {
  let service: MetodoPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
