import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: `` })
export abstract class BaseComponent implements OnDestroy {
  protected destroyed$ = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
