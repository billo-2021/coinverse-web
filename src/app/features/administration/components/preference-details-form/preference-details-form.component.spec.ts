import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceDetailsFormComponent } from './preference-details-form.component';

describe('PreferenceDetailsFormComponent', () => {
  let component: PreferenceDetailsFormComponent;
  let fixture: ComponentFixture<PreferenceDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceDetailsFormComponent],
    });
    fixture = TestBed.createComponent(PreferenceDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
