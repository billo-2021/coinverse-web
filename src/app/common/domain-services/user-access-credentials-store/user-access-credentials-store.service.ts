import {Inject, Injectable} from '@angular/core';
import {UserAccessCredentials} from "../../domain-models";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {LocalStorageService} from "../../../core/services/local-storage/local-storage.service";
import {StorageKey} from "../../../core/constants";

@Injectable({
  providedIn: 'root'
})
export class UserAccessCredentialsStoreService {
  public readonly userCredentials$: Observable<UserAccessCredentials | null>;
  private readonly _userCredentials: BehaviorSubject<UserAccessCredentials | null>;

  public constructor(@Inject(LocalStorageService) private readonly localStorageService: LocalStorageService) {
    const userCredentials = localStorageService.get<UserAccessCredentials>(StorageKey.USER_CREDENTIALS);

    this._userCredentials = new BehaviorSubject(userCredentials);
    this.userCredentials$ = this._userCredentials.asObservable().pipe(
      tap((userCredentials) => this.updateUserCredentialsStorage(userCredentials)));
  }

  public get userCredentials(): UserAccessCredentials | null {
    return this._userCredentials.getValue();
  }

  public set userCredentials(userCredentials: UserAccessCredentials | null) {
    this._userCredentials.next(userCredentials);
  }

  private updateUserCredentialsStorage(userCredentials: UserAccessCredentials | null): void {
    if (userCredentials == null) {
      this.localStorageService.remove(StorageKey.USER_CREDENTIALS);
      return;
    }

    this.localStorageService.set(StorageKey.USER_CREDENTIALS, userCredentials);
  }
}
