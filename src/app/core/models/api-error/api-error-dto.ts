import { apiErrorMessages } from '../../../common/constants';

export interface ApiErrorDto {
  readonly timeStamp: string;
  readonly code: keyof typeof apiErrorMessages;
  readonly message: string;
}
