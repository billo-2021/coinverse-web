import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactConfirmationComponent } from './transact-confirmation.component';

describe('TransactConfirmationComponent', () => {
  let component: TransactConfirmationComponent;
  let fixture: ComponentFixture<TransactConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactConfirmationComponent],
    });
    fixture = TestBed.createComponent(TransactConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
