import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { InputFieldSize, ListOption } from '../../types';

export type ComboboxInput<T> = {
  size: InputFieldSize;
  name: string;
  label: string;
  options: readonly ListOption<T>[];
};

const DEFAULT_HEIGHT = 44;

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboBoxComponent<T = unknown> implements ComboboxInput<T> {
  @Input() public size: InputFieldSize = 'm';
  @Input() public name = '';
  @Input() public label = '';
  protected filteredOptions: readonly ListOption<T>[] = [];
  protected height: number = DEFAULT_HEIGHT;
  private _search: string | null = null;
  @HostBinding('class') private _classes = 'block combo-box';

  public constructor(@Optional() private _formGroupDirective: FormGroupDirective) {}

  private _options: readonly ListOption<T>[] = [];

  public get options(): readonly ListOption<T>[] {
    return this._options;
  }

  @Input()
  public set options(value: readonly ListOption<T>[]) {
    this._options = value;
    this.filteredOptions = value;
    this._updateHeight();
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  public onSearch(query: string | null): void {
    this._search = query;

    this.filteredOptions = this.options.filter((option) =>
      TUI_DEFAULT_MATCHER(option, query || '', this.toString)
    );
    this._updateHeight();
  }

  public extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value;
  }

  protected toString(option: ListOption<T>): string {
    return `${option.code} ${option.name}`;
  }

  private _updateHeight(): void {
    this.height =
      (this.filteredOptions.length && this.filteredOptions.length * DEFAULT_HEIGHT) ||
      DEFAULT_HEIGHT;
  }
}
