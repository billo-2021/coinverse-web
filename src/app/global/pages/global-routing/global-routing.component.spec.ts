import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRoutingComponent } from './global-routing.component';

describe('GlobalComponent', () => {
  let component: GlobalRoutingComponent;
  let fixture: ComponentFixture<GlobalRoutingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalRoutingComponent],
    });
    fixture = TestBed.createComponent(GlobalRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
