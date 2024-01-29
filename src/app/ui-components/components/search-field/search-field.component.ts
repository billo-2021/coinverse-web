import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

export interface SearchFieldComponentInput {
  value: string;
  placeholder: string;
  disabled: boolean;
}

export interface SearchFieldComponentOutput {
  valueChange: EventEmitter<string>;
}

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent implements SearchFieldComponentInput, SearchFieldComponentOutput {
  @Input() public value = '';
  @Input() public placeholder = 'Type to search';
  @Input() public disabled = false;

  @Output() public valueChange = new EventEmitter<string>();

  @HostBinding('class') private _classes = 'block w-full';

  protected onValueChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}
