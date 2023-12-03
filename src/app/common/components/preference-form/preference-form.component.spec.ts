import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceFormComponent } from './preference-form.component';

describe('PreferenceDetailsComponent', () => {
  let component: PreferenceFormComponent;
  let fixture: ComponentFixture<PreferenceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceFormComponent],
    });
    fixture = TestBed.createComponent(PreferenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
