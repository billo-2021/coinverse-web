import { TestBed } from '@angular/core/testing';

import { ResetPasswordRequestFormService } from './reset-password-request-form.service';

describe('ResetPasswordRequestFormService', () => {
  let service: ResetPasswordRequestFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordRequestFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
