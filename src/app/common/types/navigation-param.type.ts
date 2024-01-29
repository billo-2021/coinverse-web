import { WebRoutesConfigType } from './web-routes-config.type';
import { QueryParams } from '../../core';

export type NavigationParam =
  | WebRoutesConfigType
  | {
      readonly route: WebRoutesConfigType;
      readonly routePath?: string;
      readonly queryParams?: QueryParams;
    };
