import { TestBed } from '@angular/core/testing';

import { HttpCrudService } from './http-crud.service';

describe('HttpCrudService', () => {
  let service: HttpCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
