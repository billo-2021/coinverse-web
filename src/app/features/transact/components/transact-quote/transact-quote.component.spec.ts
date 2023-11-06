import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactQuoteComponent } from './transact-quote.component';

describe('TransactQuoteComponent', () => {
  let component: TransactQuoteComponent;
  let fixture: ComponentFixture<TransactQuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactQuoteComponent],
    });
    fixture = TestBed.createComponent(TransactQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
