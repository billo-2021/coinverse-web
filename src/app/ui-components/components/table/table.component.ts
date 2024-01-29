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
import { paginationToken } from '../../config';
import { Pagination } from '../../types';

export interface TableComponentInput<T extends object, K extends string | 'actions' | keyof T> {
  columns: readonly K[];
  keys: Record<K, string> | null;
  data: readonly T[];
  rowDataTemplates: Partial<Record<K, TemplateRef<unknown>>> | null;
  pagination: Pagination;
  total: number;
}

export interface TableComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T extends object, K extends string | 'actions' | keyof T>
  implements TableComponentInput<T, K>, TableComponentOutput
{
  @Input() public columns: readonly K[] = [];
  @Input() public keys: Record<K, string> | null = null;
  @Input() public data: readonly T[] = [];
  @Input() public rowDataTemplates: Partial<Record<K, TemplateRef<unknown>>> | null = null;
  @Input() public pagination: Pagination = this._paginationToken;
  @Input() public total = 1;

  @Output() public paginationChanged = new EventEmitter<Pagination>();
  protected loading$ = this._loadingService.loading$;
  @HostBinding('class') private _classes = 'block overflow-x-auto';

  public constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _loadingService: LoadingService
  ) {}

  public onPagination(pagination: Pagination): void {
    this.paginationChanged.emit(pagination);
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
