import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactExchangeRateComponent } from './transact-exchange-rate.component';

describe('TransactExchangeRateComponent', () => {
  let component: TransactExchangeRateComponent;
  let fixture: ComponentFixture<TransactExchangeRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactExchangeRateComponent]
    });
    fixture = TestBed.createComponent(TransactExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
