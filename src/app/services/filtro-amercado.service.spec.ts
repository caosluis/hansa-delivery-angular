import { TestBed } from '@angular/core/testing';

import { FiltroAmercadoService } from './filtro-amercado.service';

describe('FiltroAmercadoService', () => {
  let service: FiltroAmercadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroAmercadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
