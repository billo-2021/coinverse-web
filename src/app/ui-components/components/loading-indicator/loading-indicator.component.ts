import {Component, Input} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent {
  @Input() variant: ThemePalette = 'primary';
  @Input() diameter = 30;
  @Input() strokeWidth = 10;
}
