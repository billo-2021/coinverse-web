import { TestBed } from '@angular/core/testing';

import { NavigationController } from './navigation.controller';

describe('NavigationService', () => {
  let service: NavigationController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
