import { TestBed } from '@angular/core/testing';

import { UserPrincipalStoreService } from './user-principal-store.service';

describe('UserPrincipalStoreService', () => {
  let service: UserPrincipalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPrincipalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
