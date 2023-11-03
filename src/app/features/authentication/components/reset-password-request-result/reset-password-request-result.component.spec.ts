import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordRequestResultComponent } from './reset-password-request-result.component';

describe('ResetPasswordRequestResultComponent', () => {
  let component: ResetPasswordRequestResultComponent;
  let fixture: ComponentFixture<ResetPasswordRequestResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordRequestResultComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordRequestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
