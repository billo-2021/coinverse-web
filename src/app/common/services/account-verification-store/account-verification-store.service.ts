import { Injectable } from '@angular/core';
import { AccountVerification } from '../../domain-models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationStoreService extends BehaviorSubject<AccountVerification | null> {
  public constructor() {
    super(null);
  }
}
