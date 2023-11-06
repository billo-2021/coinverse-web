import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactResultComponent } from './transact-result.component';

describe('TransactResultComponent', () => {
  let component: TransactResultComponent;
  let fixture: ComponentFixture<TransactResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactResultComponent],
    });
    fixture = TestBed.createComponent(TransactResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
