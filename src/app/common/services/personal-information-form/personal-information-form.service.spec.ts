import { TestBed } from '@angular/core/testing';

import { PersonalInformationFormService } from './personal-information-form.service';

describe('PersonalInformationFormService', () => {
  let service: PersonalInformationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInformationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
