import { TestBed } from '@angular/core/testing';

import { TransactFormViewModelService } from './transact-form-view-model.service';

describe('TransactFormViewModelService', () => {
  let service: TransactFormViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactFormViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
