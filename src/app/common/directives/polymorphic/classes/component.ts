import { Injector, Type } from '@angular/core';
import { POLYMORPHIC_CONTEXT } from '../tokens/context';

export class PolymorphicComponent<T, _C = any> {
  constructor(
    public readonly component: Type<T>,
    private readonly _injector?: Injector | null
  ) {}

  createInjector<C>(injector: Injector, useValue?: C): Injector {
    return Injector.create({
      parent: this._injector || injector,
      providers: [
        {
          provide: POLYMORPHIC_CONTEXT,
          useValue,
        },
      ],
    });
  }
}
