import { Injectable } from '@angular/core';
import { Log } from '../../types';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggingService extends ReplaySubject<Log> {
  constructor() {
    super(1);
  }
}
