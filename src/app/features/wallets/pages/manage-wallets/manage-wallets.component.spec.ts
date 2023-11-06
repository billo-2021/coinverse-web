import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWalletsComponent } from './manage-wallets.component';

describe('ManageWalletsComponent', () => {
  let component: ManageWalletsComponent;
  let fixture: ComponentFixture<ManageWalletsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageWalletsComponent],
    });
    fixture = TestBed.createComponent(ManageWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
