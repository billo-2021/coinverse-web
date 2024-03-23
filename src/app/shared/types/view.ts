import { Observable } from 'rxjs';

export type View<TViewModel> = {
  readonly viewModel$: Observable<TViewModel>;
};
