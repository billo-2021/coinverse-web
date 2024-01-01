import { TestBed } from '@angular/core/testing';

import { TradeFormViewModelService } from './trade-form-view-model.service';

describe('TradeFormViewModelService', () => {
  let service: TradeFormViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeFormViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
