import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  Optional,
  ViewEncapsulation,
} from '@angular/core';

import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';

import { SimpleChangesTyped } from '../../../common';

import { ListOption, Option } from '../../types';

export type SizeType = 's' | 'm' | 'l';

export type ComboboxInput<T> = {
  size: SizeType;
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
export class ComboBoxComponent<T = unknown> implements OnChanges {
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public options: readonly ListOption<T>[] = [];

  private readonly _search$ = new Subject<string | null>();
  private readonly _options$: BehaviorSubject<readonly ListOption<T>[]>;
  private readonly _height$: BehaviorSubject<number>;

  private _disabled = new BehaviorSubject<boolean>(false);

  @HostBinding('class') private _classes = 'block combo-box';

  public constructor(@Optional() private _formGroupDirective: FormGroupDirective) {
    this._options$ = new BehaviorSubject<readonly ListOption<T>[]>(this.options);
    this._height$ = new BehaviorSubject(
      (this.options.length && this.options.length * DEFAULT_HEIGHT) || DEFAULT_HEIGHT
    );
  }

  @Input()
  public set isDisabled(value: boolean) {
    this._disabled.next(value);
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): AbstractControl<unknown> | null {
    return this.formGroup?.controls[this.name] || null;
  }

  protected get options$(): Observable<readonly Option<T>[] | null> {
    return this._options$.asObservable();
  }

  protected get height$(): Observable<number> {
    return this._height$.asObservable();
  }

  ngOnChanges(changes: SimpleChangesTyped<ComboboxInput<T>>): void {
    if (!changes.options) {
      return;
    }

    this._options$.next(this.options);
    this._height$.next(
      (this.options.length && this.options.length * DEFAULT_HEIGHT) || DEFAULT_HEIGHT
    );
  }

  public onSearch(query: string | null): void {
    this._search$.next(query);
    const filteredOptions = this.options.filter((option) =>
      TUI_DEFAULT_MATCHER(option, query || '', this.toString)
    );

    this._options$.next(filteredOptions);
    this._height$.next(
      (filteredOptions.length && filteredOptions.length * DEFAULT_HEIGHT) || DEFAULT_HEIGHT
    );
  }

  public extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value;
  }

  protected toString(option: Option<T>): string {
    return `${option.code} ${option.name}`;
  }
}
