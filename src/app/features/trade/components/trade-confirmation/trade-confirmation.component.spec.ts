import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeConfirmationComponent } from './trade-confirmation.component';

describe('TradeConfirmationComponent', () => {
  let component: TradeConfirmationComponent;
  let fixture: ComponentFixture<TradeConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradeConfirmationComponent],
    });
    fixture = TestBed.createComponent(TradeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
