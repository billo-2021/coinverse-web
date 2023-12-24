import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.scss'],
})
export class MenuFooterComponent {
  @HostBinding('class') private _classes = 'block';
}
