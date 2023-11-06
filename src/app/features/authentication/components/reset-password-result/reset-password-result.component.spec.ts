import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordResultComponent } from './reset-password-result.component';

describe('ResetPasswordResultComponent', () => {
  let component: ResetPasswordResultComponent;
  let fixture: ComponentFixture<ResetPasswordResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordResultComponent],
    });
    fixture = TestBed.createComponent(ResetPasswordResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
