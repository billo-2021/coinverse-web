import { TemplateRef } from '@angular/core';
import { PolymorphicTemplate } from '../../template.directive';
import { PolymorphicComponent } from '../classes/component';
import { PolymorphicHandler } from './handler';
import { PolymorphicPrimitive } from './primitive';

export type PolymorphicContent<C = any> =
  | TemplateRef<Partial<C>>
  | PolymorphicTemplate<Partial<C> | ''>
  | PolymorphicComponent<unknown>
  | PolymorphicHandler<C>
  | PolymorphicPrimitive;
