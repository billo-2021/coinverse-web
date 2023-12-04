import { v4 as uuid } from 'uuid';

export class RandomUtils {
  public static generateRandomString(): string {
    return uuid();
  }
}
