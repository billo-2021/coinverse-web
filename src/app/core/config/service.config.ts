import {httpHeadersConfig} from './api-request.config';
import {environment} from '../../../environments/environment';

const coreServiceConfig = {
  httpHeadersConfig: httpHeadersConfig,
  apiUrl: environment.baseApiUrl
} as const;

export {coreServiceConfig}
