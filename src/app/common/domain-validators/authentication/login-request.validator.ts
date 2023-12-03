import { LoginRequest } from '../../domain-models';

export function isLoginRequest(value: unknown): value is LoginRequest {
  return (
    value != null &&
    typeof value === 'object' &&
    'username' in value &&
    typeof value.username === 'string' &&
    'password' in value &&
    typeof value.password === 'string'
  );
}
