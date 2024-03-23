import { NavigationParam } from '../types';
import { WebRoute } from '../enums';

function isWebRoute(navigationParam: NavigationParam): navigationParam is WebRoute {
  return Object.values(WebRoute).some((webRoute) => webRoute === navigationParam);
}

function toRoute(url: string): WebRoute | null {
  return Object.values(WebRoute).find((webRoute) => webRoute === url) ?? null;
}

export const WebRouteUtils = {
  isWebRoute,
  toRoute,
} as const;
