import { TestBed } from '@angular/core/testing';

import { TradeFormService } from './trade-form.service';

describe('TradeFormService', () => {
  let service: TradeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
