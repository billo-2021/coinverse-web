import { TestBed } from '@angular/core/testing';

import { AccountVerificationService } from './account-verification.service';

describe('AccountVerificationService', () => {
  let service: AccountVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
