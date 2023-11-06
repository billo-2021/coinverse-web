import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTradesComponent } from './manage-trades.component';

describe('ManageTradesComponent', () => {
  let component: ManageTradesComponent;
  let fixture: ComponentFixture<ManageTradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTradesComponent],
    });
    fixture = TestBed.createComponent(ManageTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
