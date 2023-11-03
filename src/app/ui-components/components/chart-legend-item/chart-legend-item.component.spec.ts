import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLegendItemComponent } from './chart-legend-item.component';

describe('ChartLegendItemComponent', () => {
  let component: ChartLegendItemComponent;
  let fixture: ComponentFixture<ChartLegendItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartLegendItemComponent]
    });
    fixture = TestBed.createComponent(ChartLegendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
