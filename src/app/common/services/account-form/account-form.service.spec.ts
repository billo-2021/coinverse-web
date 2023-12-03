import { TestBed } from '@angular/core/testing';

import { AccountFormService } from './account-form.service';

describe('AccountFormService', () => {
  let service: AccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
