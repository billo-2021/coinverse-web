import { TestBed } from '@angular/core/testing';

import { TransactBankDetailsFormService } from './transact-bank-details-form.service';

describe('TransactBankDetailsFormService', () => {
  let service: TransactBankDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactBankDetailsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
