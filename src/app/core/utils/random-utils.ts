import { v4 as uuid } from 'uuid';

export const RandomUtils = {
  generateRandomString(): string {
    return uuid();
  },
};
