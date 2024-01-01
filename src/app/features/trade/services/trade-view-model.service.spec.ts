import { TestBed } from '@angular/core/testing';

import { TradeViewModelService } from './trade-view-model.service';

describe('TradeViewModelService', () => {
  let service: TradeViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
