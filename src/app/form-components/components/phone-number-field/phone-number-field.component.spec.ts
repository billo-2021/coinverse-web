import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberFieldComponent } from './phone-number-field.component';

describe('PhoneNumberFieldComponent', () => {
  let component: PhoneNumberFieldComponent;
  let fixture: ComponentFixture<PhoneNumberFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberFieldComponent],
    });
    fixture = TestBed.createComponent(PhoneNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
