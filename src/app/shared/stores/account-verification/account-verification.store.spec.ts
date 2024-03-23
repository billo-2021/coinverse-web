import { TestBed } from '@angular/core/testing';

import { AccountVerificationStore } from './account-verification.store';

describe('AccountVerificationStoreService', () => {
  let service: AccountVerificationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountVerificationStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
