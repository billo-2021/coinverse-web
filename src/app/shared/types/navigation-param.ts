import { QueryParams } from './query-params';
import { WebRoute } from '../enums';

export type NavigationParam =
  | WebRoute
  | {
      readonly route: WebRoute;
      readonly routePath?: string;
      readonly queryParams?: QueryParams;
    };
