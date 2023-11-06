import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiatCurrenciesComponent } from './fiat-currencies.component';

describe('FiatCurrenciesComponent', () => {
  let component: FiatCurrenciesComponent;
  let fixture: ComponentFixture<FiatCurrenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiatCurrenciesComponent],
    });
    fixture = TestBed.createComponent(FiatCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
