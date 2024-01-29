import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Log } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LoggingService extends ReplaySubject<Log> {
  constructor() {
    super(1);
  }
}
