import { RegisterRequest } from '../../domain-models';
import { isRegisterAddressRequest } from './register-address-request.validator';
import { isRegisterPreferenceRequest } from './register-preference-request.validator';
import { isRegisterAccountRequest } from './register-account-request.validator';

export function isRegisterRegisterRequest(request: unknown): request is RegisterRequest {
  return (
    request !== null &&
    typeof request === 'object' &&
    'firstName' in request &&
    typeof request.firstName === 'string' &&
    'lastName' in request &&
    typeof request.lastName === 'string' &&
    'emailAddress' in request &&
    typeof request.emailAddress === 'string' &&
    'phoneNumber' in request &&
    typeof request.phoneNumber === 'string' &&
    'address' in request &&
    isRegisterAddressRequest(request.address) &&
    'preference' in request &&
    isRegisterPreferenceRequest(request.address) &&
    'account' in request &&
    isRegisterAccountRequest(request.account)
  );
}
