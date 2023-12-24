import { TestBed } from '@angular/core/testing';

import { ManageWalletsViewModelService } from './manage-wallets-view-model.service';

describe('ManageWalletsViewModelService', () => {
  let service: ManageWalletsViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageWalletsViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
