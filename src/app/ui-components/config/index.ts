import { UiConfig } from '../types';
import { PAGINATION } from '../constants';
import { PAGINATION_TOKEN } from '../tokens';

export const uiConfig: UiConfig = {
  providers: [
    {
      provide: PAGINATION_TOKEN,
      useValue: PAGINATION,
    },
  ],
};
