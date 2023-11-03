import {TestBed} from '@angular/core/testing';

import {GlobalRoutingService} from './global-routing.service';

describe('GlobalRoutingService', () => {
  let service: GlobalRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
