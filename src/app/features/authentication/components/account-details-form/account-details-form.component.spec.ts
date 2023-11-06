import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsFormComponent } from './account-details-form.component';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsFormComponent;
  let fixture: ComponentFixture<AccountDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailsFormComponent],
    });
    fixture = TestBed.createComponent(AccountDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
