import { TestBed } from '@angular/core/testing';
import { MenuController } from './menu.service';

describe('MenuController', () => {
  let service: MenuController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
