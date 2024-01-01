import { TestBed } from '@angular/core/testing';

import { TradeQuoteViewModelService } from './trade-quote-view-model.service';

describe('TradeQuoteViewModelService', () => {
  let service: TradeQuoteViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeQuoteViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
