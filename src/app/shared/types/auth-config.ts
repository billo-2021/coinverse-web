import { MessagingChannel } from './messaging-channel';

export type AuthConfig = {
  readonly otpLength: number;
  readonly verificationMethod: MessagingChannel;
  readonly messagingChannel: MessagingChannel;
};
