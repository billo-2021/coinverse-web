import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeResultComponent } from './trade-result.component';

describe('TradeResultComponent', () => {
  let component: TradeResultComponent;
  let fixture: ComponentFixture<TradeResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradeResultComponent]
    });
    fixture = TestBed.createComponent(TradeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
