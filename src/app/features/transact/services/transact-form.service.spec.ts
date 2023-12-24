import { TestBed } from '@angular/core/testing';

import { TransactFormService } from './transact-form.service';

describe('TransactFormService', () => {
  let service: TransactFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
