import {Injectable} from '@angular/core';
import {AccountVerification} from "../../domain-models";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountVerificationStoreService {
  private readonly _accountVerification
    = new BehaviorSubject<AccountVerification | null>(null);

  public readonly accountVerification$
    = this._accountVerification.asObservable();

  public constructor() {
  }

  public get accountVerification() {
    return this._accountVerification.getValue();
  }

  public set accountVerification(accountVerification: AccountVerification | null) {
    this._accountVerification.next(accountVerification);
  }
}
