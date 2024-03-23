import { TestBed } from '@angular/core/testing';

import { LogState } from './log.state';

describe('LoggingService', () => {
  let service: LogState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
