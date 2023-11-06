import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStatusComponent } from './block-status.component';

describe('BlockStatusComponent', () => {
  let component: BlockStatusComponent;
  let fixture: ComponentFixture<BlockStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockStatusComponent],
    });
    fixture = TestBed.createComponent(BlockStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
