import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactFormComponent } from './transact-form.component';

describe('TransactFormComponent', () => {
  let component: TransactFormComponent;
  let fixture: ComponentFixture<TransactFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactFormComponent],
    });
    fixture = TestBed.createComponent(TransactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
