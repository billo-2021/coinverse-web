import { Injectable, Self } from '@angular/core';
import { UserAccessCredentials } from '../../domain-models';
import { BehaviorSubject, skip, takeUntil, tap } from 'rxjs';

import { DestroyService, LocalStorageService, StorageKey } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class UserAccessCredentialsStoreService extends BehaviorSubject<UserAccessCredentials | null> {
  public constructor(
    private readonly _localStorageService: LocalStorageService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    super(_localStorageService.get<UserAccessCredentials>(StorageKey.USER_CREDENTIALS));

    this.pipe(
      skip(1),
      tap((accessCredentials) => this.updateStorage(accessCredentials)),
      takeUntil(this._destroy$)
    ).subscribe();
  }

  private updateStorage(userCredentials: UserAccessCredentials | null): void {
    if (userCredentials == null) {
      this._localStorageService.remove(StorageKey.USER_CREDENTIALS);
      return;
    }

    this._localStorageService.set(StorageKey.USER_CREDENTIALS, userCredentials);
  }
}
