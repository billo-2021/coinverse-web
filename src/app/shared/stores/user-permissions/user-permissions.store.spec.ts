import { TestBed } from '@angular/core/testing';

import { UserPermissionsStore } from './user-permissions.store';

describe('UserPermissionsService', () => {
  let service: UserPermissionsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPermissionsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
