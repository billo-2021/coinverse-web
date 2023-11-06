import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCardGroupedComponent } from './input-card-grouped.component';

describe('InputCardGroupedComponent', () => {
  let component: InputCardGroupedComponent;
  let fixture: ComponentFixture<InputCardGroupedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputCardGroupedComponent],
    });
    fixture = TestBed.createComponent(InputCardGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
