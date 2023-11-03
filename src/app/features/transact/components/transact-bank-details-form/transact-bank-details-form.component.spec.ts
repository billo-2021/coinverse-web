import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactBankDetailsFormComponent} from './transact-bank-details-form.component';

describe('TransactBankDetailsComponent', () => {
  let component: TransactBankDetailsFormComponent;
  let fixture: ComponentFixture<TransactBankDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactBankDetailsFormComponent]
    });
    fixture = TestBed.createComponent(TransactBankDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
