import { v4 as uuid } from 'uuid';

export class RandomUtil {
  public static generateRandomString(): string {
    return uuid();
  }
}
