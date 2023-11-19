import { WebRoutesConfigType } from './web-routes-config.type';
import { QueryParams } from './query-params.type';

export type NavigationParam =
  | WebRoutesConfigType
  | {
      route: WebRoutesConfigType;
      routePath?: string;
      queryParams: QueryParams;
    };
