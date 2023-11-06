import { TestBed } from '@angular/core/testing';

import { UserAccessCredentialsStoreService } from './user-access-credentials-store.service';

describe('UserCredentialsStoreService', () => {
  let service: UserAccessCredentialsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccessCredentialsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
