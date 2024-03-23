import { View } from './view';
import { Page } from './page';

export type ViewPage<TViewModel> = View<TViewModel> & Page;
