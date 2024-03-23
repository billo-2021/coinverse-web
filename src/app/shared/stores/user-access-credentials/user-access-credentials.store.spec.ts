import { TestBed } from '@angular/core/testing';

import { UserAccessCredentialsStore } from './user-access-credentials.store';

describe('UserCredentialsStoreService', () => {
  let service: UserAccessCredentialsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccessCredentialsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
