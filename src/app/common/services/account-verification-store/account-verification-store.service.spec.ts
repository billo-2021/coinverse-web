import { TestBed } from '@angular/core/testing';

import { AccountVerificationStoreService } from './account-verification-store.service';

describe('AccountVerificationStoreService', () => {
  let service: AccountVerificationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountVerificationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
