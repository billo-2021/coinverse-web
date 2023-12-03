import { RegisterPreferenceRequest } from '../../domain-models';

export function isRegisterPreferenceRequest(request: unknown): request is Omit<
  RegisterPreferenceRequest,
  'notificationMethods'
> & {
  notificationMethods: {
    email?: string;
    sms?: string;
  };
} {
  return (
    request !== null &&
    typeof request === 'object' &&
    'currencyCode' in request &&
    typeof request.currencyCode === 'string' &&
    'notificationMethods' in request &&
    typeof request.notificationMethods === 'object' &&
    request.notificationMethods !== null &&
    (('email' in request.notificationMethods &&
      request.notificationMethods.email !== null &&
      typeof request.notificationMethods.email === 'boolean') ||
      ('sms' in request && request.sms !== null && typeof request.sms !== 'undefined'))
  );
}
