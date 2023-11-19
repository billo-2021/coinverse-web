import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ListOption } from '../../types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { LoadingService } from '../../../core/services/loading/loading.service';

export type SizeType = 's' | 'm' | 'l';

const DEFAULT_HEIGHT = 44;

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboBoxComponent implements OnChanges {
  @Input() size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public options: ListOption[] = [];
  @Input() public isDisabled = false;
  private readonly _search$ = new Subject<string | null>();
  private readonly _options$: BehaviorSubject<ListOption[]>;
  private readonly _height$: BehaviorSubject<number>;

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private _formGroupDirective: FormGroupDirective
  ) {
    this._options$ = new BehaviorSubject<ListOption[]>(this.options);
    this._height$ = new BehaviorSubject(
      (this.options.length && this.options.length * DEFAULT_HEIGHT) || DEFAULT_HEIGHT
    );
  }

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `combo-box ${this._classes}`;
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }

  protected get options$(): Observable<readonly ListOption[] | null> {
    return this._options$.asObservable();
  }

  protected get height$(): Observable<number> {
    return this._height$.asObservable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options']) {
      return;
    }

    this._options$.next(this.options);
    this._height$.next((this.options.length && this.options.length * DEFAULT_HEIGHT) || DEFAULT_HEIGHT);
  }

  public onSearch(query: string | null): void {
    this._search$.next(query);
    const filteredOptions = this.options.filter((option) => TUI_DEFAULT_MATCHER(option, query || ''));

    this._options$.next(filteredOptions);
    this._height$.next((filteredOptions.length && filteredOptions.length * DEFAULT_HEIGHT) || DEFAULT_HEIGHT);
  }

  public extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value;
  }
}
