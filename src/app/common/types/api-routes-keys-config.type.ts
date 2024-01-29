import { apiRoutesConfig } from '../config';

export type ApiRoutesKeysConfigType = (typeof apiRoutesConfig)[keyof typeof apiRoutesConfig];
