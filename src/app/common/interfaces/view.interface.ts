import { Observable } from 'rxjs';

export interface View<TViewModel> {
  readonly viewModel$: Observable<TViewModel>;
}
