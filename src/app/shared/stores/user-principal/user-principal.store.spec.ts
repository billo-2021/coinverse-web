import { TestBed } from '@angular/core/testing';

import { UserPrincipalStore } from './user-principal.store';

describe('UserPrincipalStoreService', () => {
  let service: UserPrincipalStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPrincipalStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
