import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountVerification } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationStoreService extends BehaviorSubject<AccountVerification | null> {
  public constructor() {
    super(null);
  }
}
