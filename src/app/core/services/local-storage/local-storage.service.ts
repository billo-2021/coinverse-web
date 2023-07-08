import {Injectable} from '@angular/core';

import {Nullable} from '../../types/nullable';
import {ValueTypeIs} from "../../types/when";

enum StorageKeys {
  USER = '_user',
  ACCESS_TOKEN = '_access_token'
}

function isUser(value: unknown): value is User {
  return (typeof value === 'object' && value != null &&
    'username' in value && 'emailAddress' in value && 'firstName' in value &&
    'lastName' in value && 'phoneNumber' in value && 'roles' in value
    && 'isVerified' in value
  );
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public constructor() {
  }

  public getUser(): Nullable<User> {
    const storageItem = this.get(StorageKeys.USER);
    return Nullable.getWhenValueTypeIs(storageItem, isUser);
  }

  public set<T>(key: string, item: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public getAccessToken(): Nullable<string> {
    try {
      const accessToken = this.get(StorageKeys.ACCESS_TOKEN);
      return Nullable.getWhenValueTypeIs(accessToken,
        (value): value is string =>
          typeof value == 'string'
      );
    } catch (e: unknown) {
      console.error(e);
      return null;
    }
  }

  public get(key: string): Nullable<unknown> {
    try {
      const item: string | null = localStorage.getItem(key);

      return Nullable.isNone(item) ?
        Nullable.nothing :
        Nullable.of(JSON.parse(item));

    } catch (e) {
      console.error(e);
      return Nullable.nothing;
    }
  }

  public getWhen<T>(key: string, valueTypeIs: ValueTypeIs<T>): Nullable<T> {
    const item = this.get(key);

    const isOfType = valueTypeIs(item);

    if (!isOfType) {
      throw new Error('Invalid value');
    }

    return item;
  }
}
