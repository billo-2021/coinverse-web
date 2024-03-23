import { Injectable, Self } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserAccessCredentials } from '../../models';
import { StorageKey } from '../../enums';
import { DestroyState } from '../../states';
import { LocalStorageService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class UserAccessCredentialsStore extends BehaviorSubject<UserAccessCredentials | null> {
  public constructor(
    private readonly _localStorageService: LocalStorageService,
    @Self() private readonly _destroy$: DestroyState
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
