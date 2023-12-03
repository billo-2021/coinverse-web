import { RegisterAccountRequest } from '../../domain-models';

export function isRegisterAccountRequest(request: unknown): request is RegisterAccountRequest {
  return (
    request !== null &&
    typeof request === 'object' &&
    'username' in request &&
    typeof request.username === 'string' &&
    'password' in request &&
    typeof request.password === 'string'
  );
}
