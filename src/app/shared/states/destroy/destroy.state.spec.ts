import { TestBed } from '@angular/core/testing';

import { DestroyState } from './destroy.state';

describe('DestroyService', () => {
  let service: DestroyState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestroyState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
