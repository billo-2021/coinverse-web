import { TestBed } from '@angular/core/testing';

import { PasswordResetStoreService } from './password-reset-store.service';

describe('PasswordResetStoreService', () => {
  let service: PasswordResetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
