import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TUI_DEFAULT_MATCHER, tuiDefaultSort, tuiIsFalsy, tuiIsPresent } from '@taiga-ui/cdk';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  share,
  startWith,
  switchMap,
  timer,
} from 'rxjs';
import { TUI_ARROW } from '@taiga-ui/kit';
import { TuiComparator } from '@taiga-ui/addon-table';

interface Currency {
  readonly name: string;
  readonly price: number;
  readonly circulatingSupply: number;
  readonly change: number;
}

type Key = 'name' | 'price' | 'change' | 'circulatingSupply';

const DATA: readonly Currency[] = [
  { name: 'Bitcoin', price: 20000, change: 4, circulatingSupply: 200000 },
  { name: 'Ethereum', price: 1999, change: 4, circulatingSupply: 40000000 },
  {
    name: 'Shiba Inu',
    price: 0.0000567,
    change: 3.67,
    circulatingSupply: 2000000,
  },
];

const KEYS: Record<string, Key> = {
  Name: 'name',
  Price: 'price',
  '24hr %': 'change',
  'Circulating Supply': 'circulatingSupply',
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public readonly sorter$ = new BehaviorSubject<Key>('name');
  protected initial: readonly string[] = ['Name', 'Price', '24hr %', 'Circulating Supply'];
  protected enabled = this.initial;
  protected columns = ['name', 'price', 'change', 'circulatingSupply'];
  protected search = '';
  protected readonly arrow = TUI_ARROW;
  protected readonly total$: Observable<number>;
  protected readonly loading$: Observable<boolean>;
  protected readonly data$: Observable<readonly Currency[]>;
  private readonly size$ = new BehaviorSubject(10);
  private readonly page$ = new BehaviorSubject(0);
  protected readonly request$ = combineLatest([this.sorter$, this.page$, this.size$]).pipe(
    debounceTime(0),
    switchMap((query) => this.getData(...query).pipe(startWith(null))),
    share()
  );

  public constructor() {
    this.loading$ = this.request$.pipe(map(tuiIsFalsy));

    this.total$ = this.request$.pipe(
      filter(tuiIsPresent),
      map(({ length }) => length),
      startWith(1)
    );

    this.data$ = this.request$.pipe(
      filter(tuiIsPresent),
      map((users) => users.filter(tuiIsPresent)),
      startWith([])
    );
  }

  public onSize(size: number): void {
    this.size$.next(size);
  }

  public onPage(page: number): void {
    this.page$.next(page);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onEnabled(enabled: readonly string[]): void {
    this.enabled = enabled;
    this.columns = this.initial
      .filter((column) => enabled.includes(column))
      .map((column) => KEYS[column]);
  }

  private getData(
    key: 'name' | 'price' | 'change' | 'circulatingSupply',
    page: number,
    size: number
  ): Observable<ReadonlyArray<Currency | null>> {
    const start = page * size;
    const end = start + size;
    const result = [...DATA]
      .sort(sortBy(key))
      .map((currency, index) => (index >= start && index < end ? currency : null));

    return timer(3000).pipe(map(() => result));
  }
}

function sortBy(key: 'name' | 'price' | 'change' | 'circulatingSupply'): TuiComparator<Currency> {
  return (a, b) => tuiDefaultSort(a[key], b[key]);
}
