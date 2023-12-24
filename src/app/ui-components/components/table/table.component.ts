import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { LoadingService } from '../../../core';

import { Pagination } from '../../types';
import { paginationToken } from '../../config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T extends object, K extends string | 'actions' | keyof T> {
  @Input() public columns: readonly K[] = [];
  @Input() public keys: Record<K, string> | null = null;
  @Input() public data: readonly T[] = [];
  @Input() public rowDataTemplates: Partial<Record<K, TemplateRef<unknown>>> | null = null;
  @Input() public pagination: Pagination = this._paginationToken;
  @Input() public total = 1;

  @Output() public paginationChanged = new EventEmitter<Pagination>();
  protected loading$ = this._loadingService.loading$;
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _loadingService: LoadingService
  ) {}

  public onPagination(pagination: Pagination): void {
    this.paginationChanged.emit(pagination);
  }

  public getColumnValue(data: T, column: K) {
    if (this.hasColumn(data, column)) {
      return data[column];
    }

    return null;
  }

  public hasColumn(data: T, column: unknown): column is keyof T {
    return Object.keys(data).some((key) => key === column);
  }

  public isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  public isStringArray(values: unknown): values is string[] {
    return Array.isArray(values) && values.every((value) => typeof value === 'string');
  }
}
