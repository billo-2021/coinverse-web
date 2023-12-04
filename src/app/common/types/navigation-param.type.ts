import { WebRoutesConfigType } from './web-routes-config.type';
import { QueryParams } from '../../core';

export type NavigationParam =
  | WebRoutesConfigType
  | {
      route: WebRoutesConfigType;
      routePath?: string;
      queryParams: QueryParams;
    };
