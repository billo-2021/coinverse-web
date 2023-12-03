import { TestBed } from '@angular/core/testing';

import { PreferenceFormService } from './preference-form.service';

describe('PreferenceFormService', () => {
  let service: PreferenceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferenceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
