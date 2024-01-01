import { TestBed } from '@angular/core/testing';

import { ManageTransactionsViewModelService } from './manage-transactions-view-model.service';

describe('ManageTransactionsViewModelService', () => {
  let service: ManageTransactionsViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTransactionsViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
