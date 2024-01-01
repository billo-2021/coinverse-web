import { TestBed } from '@angular/core/testing';

import { ApiCrudClient } from './api-crud-client.service';

describe('ApiCrudClientService', () => {
  let service: ApiCrudClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCrudClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
