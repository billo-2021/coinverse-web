import { ChangeDetectorRef, Directive, Self, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[polymorphic]',
  exportAs: 'polymorphic',
  inputs: ['polymorphic'],
})
export class PolymorphicTemplate<C = any> {
  polymorphic: C | '' = '';

  constructor(
    @Self() public readonly template: TemplateRef<C>,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  static ngTemplateContextGuard<T>(_dir: PolymorphicTemplate<T>, _ctx: any): _ctx is T extends '' ? any : T {
    return true;
  }

  check(): void {
    this._changeDetectorRef.markForCheck();
  }
}
