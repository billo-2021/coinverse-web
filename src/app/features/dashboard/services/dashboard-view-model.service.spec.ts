import { TestBed } from '@angular/core/testing';

import { DashboardViewModelService } from './dashboard-view-model.service';

describe('DashboardViewModelService', () => {
  let service: DashboardViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
