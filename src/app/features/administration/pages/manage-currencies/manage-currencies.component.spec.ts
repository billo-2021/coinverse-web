import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCurrenciesComponent } from './manage-currencies.component';

describe('ManageCurrenciesComponent', () => {
  let component: ManageCurrenciesComponent;
  let fixture: ComponentFixture<ManageCurrenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCurrenciesComponent],
    });
    fixture = TestBed.createComponent(ManageCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
