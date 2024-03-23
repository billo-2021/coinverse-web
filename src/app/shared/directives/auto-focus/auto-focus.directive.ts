import { AfterViewInit, Directive, Input } from '@angular/core';
import { FocusOptions } from '../../types';
import { FOCUS_OPTIONS } from '../../constants';

export interface Focusable {
  focus: (options: FocusOptions) => void;
}

export interface AutoFocusDirectiveInput {
  itemToFocus: Focusable | null;
  options: FocusOptions;
}

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  @Input() public itemToFocus: Focusable | null = null;
  @Input() public options: FocusOptions = FOCUS_OPTIONS;

  public ngAfterViewInit(): void {
    if (!this.itemToFocus) {
      return;
    }

    this.itemToFocus.focus(this.options);
  }
}
