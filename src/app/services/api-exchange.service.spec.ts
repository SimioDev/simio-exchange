import { TestBed } from '@angular/core/testing';

import { ApiExchangeService } from './api-exchange.service';

describe('ApiExchangeService', () => {
  let service: ApiExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
