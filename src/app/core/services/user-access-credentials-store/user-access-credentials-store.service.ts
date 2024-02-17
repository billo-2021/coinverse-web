import { Injectable, Self } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageKey } from '../../constants';
import { UserAccessCredentials } from '../../models';
import { DestroyService } from '../destroy/destroy.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccessCredentialsStoreService extends BehaviorSubject<UserAccessCredentials | null> {
  public constructor(
    private readonly _localStorageService: LocalStorageService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    super(_localStorageService.get<UserAccessCredentials>(StorageKey.USER_CREDENTIALS));
  }

  public override next(value: UserAccessCredentials | null): void {
    super.next(value);
    this._updateUserAccessCredentialsStorage(value);
  }

  private _updateUserAccessCredentialsStorage(userCredentials: UserAccessCredentials | null): void {
    if (userCredentials == null) {
      this._localStorageService.remove(StorageKey.USER_CREDENTIALS);
      return;
    }

    this._localStorageService.set(StorageKey.USER_CREDENTIALS, userCredentials);
  }
}
