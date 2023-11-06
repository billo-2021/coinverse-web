import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFooterComponent } from './menu-footer.component';

describe('MenuFooterComponent', () => {
  let component: MenuFooterComponent;
  let fixture: ComponentFixture<MenuFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFooterComponent],
    });
    fixture = TestBed.createComponent(MenuFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
