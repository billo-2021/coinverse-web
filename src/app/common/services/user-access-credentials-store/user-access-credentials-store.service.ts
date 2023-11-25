import { Injectable, Self } from '@angular/core';
import { UserAccessCredentials } from '../../domain-models';
import { BehaviorSubject, skip, takeUntil, tap } from 'rxjs';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { StorageKey } from '../../../core/constants';
import { DestroyService } from '../../../core/services/destroy/destroy.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccessCredentialsStoreService extends BehaviorSubject<UserAccessCredentials | null> {
  public constructor(
    private readonly localStorageService: LocalStorageService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    super(localStorageService.get<UserAccessCredentials>(StorageKey.USER_CREDENTIALS));

    this.pipe(
      skip(1),
      tap((accessCredentials) => this.updateStorage(accessCredentials)),
      takeUntil(this._destroy$)
    ).subscribe();
  }

  private updateStorage(userCredentials: UserAccessCredentials | null): void {
    if (userCredentials == null) {
      this.localStorageService.remove(StorageKey.USER_CREDENTIALS);
      return;
    }

    this.localStorageService.set(StorageKey.USER_CREDENTIALS, userCredentials);
  }
}
