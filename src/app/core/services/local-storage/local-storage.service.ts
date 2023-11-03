import {Injectable} from '@angular/core';
import {StorageKey} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public constructor() {
  }

  public set<T>(key: StorageKey, item: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public get<T = unknown>(key: StorageKey): T | null {
    try {
      const item: string | null = localStorage.getItem(key);

      if (!item) {
        return null;
      }

      return JSON.parse(item);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public remove(key: StorageKey): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
