import { TestBed } from '@angular/core/testing';

import { LoadingController } from './loading.controller';

describe('LoadingService', () => {
  let service: LoadingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
