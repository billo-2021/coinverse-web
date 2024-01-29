import { Provider } from '@angular/core';

import { messagingChannelToken, otpLengthToken, verificationMethodToken } from '../config';

export const AUTHENTICATION_PROVIDERS: Provider[] = [
  {
    provide: otpLengthToken,
    useValue: 8,
  },
  {
    provide: verificationMethodToken,
    useValue: 'email',
  },
  {
    provide: messagingChannelToken,
    useValue: 'email',
  },
];
