import { TestBed } from '@angular/core/testing';

import { TransactViewModelService } from './transact-view-model.service';

describe('TransactViewModelService', () => {
  let service: TransactViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
