import { Observable } from 'rxjs';

export interface Controller<T> {
  readonly viewModel$: Observable<T>;
}
