import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCurrencyComponent } from './manage-currency.component';

describe('ManageCurrencyComponent', () => {
  let component: ManageCurrencyComponent;
  let fixture: ComponentFixture<ManageCurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCurrencyComponent],
    });
    fixture = TestBed.createComponent(ManageCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
