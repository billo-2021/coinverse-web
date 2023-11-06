import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCurrenciesComponent } from './crypto-currencies.component';

describe('CryptoCurrenciesComponent', () => {
  let component: CryptoCurrenciesComponent;
  let fixture: ComponentFixture<CryptoCurrenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoCurrenciesComponent],
    });
    fixture = TestBed.createComponent(CryptoCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
