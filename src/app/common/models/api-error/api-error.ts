import { apiErrorMessages } from "../../constants";

export interface ApiError {
  readonly timeStamp: string;
  readonly code: keyof typeof apiErrorMessages;
  readonly message: string;
}
