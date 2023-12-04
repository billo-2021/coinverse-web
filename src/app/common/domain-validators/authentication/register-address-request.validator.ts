import { RegisterAddressRequest } from '../../domain-models/authentication';

export function isRegisterAddressRequest(request: unknown): request is RegisterAddressRequest {
  return (
    request !== null &&
    typeof request === 'object' &&
    'addressLine' in request &&
    typeof request.addressLine === 'string' &&
    'street' in request &&
    typeof request.street === 'string' &&
    'countryCode' in request &&
    typeof request.countryCode === 'string' &&
    'province' in request &&
    typeof request.province === 'string' &&
    'city' in request &&
    typeof request.city === 'string' &&
    'postalCode' in request &&
    typeof request.postalCode === 'string'
  );
}
