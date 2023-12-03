import { InjectionToken } from '@angular/core';
import { MessagingChannel } from '../types';

const otpLengthToken = new InjectionToken<number>('otpTokenLength');
const verificationMethodToken = new InjectionToken<MessagingChannel>('verificationMethod');
const messagingChannelToken = new InjectionToken<MessagingChannel>('messagingChannel');

export { otpLengthToken, verificationMethodToken, messagingChannelToken };
