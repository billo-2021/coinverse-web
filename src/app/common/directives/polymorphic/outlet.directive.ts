import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Injector,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PolymorphicContent } from './types/content';
import { PolymorphicContext } from './classes/context';
import { PolymorphicPrimitive } from './types/primitive';
import { PolymorphicTemplate } from '../template.directive';
import { PolymorphicComponent } from './classes/component';

@Directive({
  selector: '[appPolymorphicOutlet]',
  inputs: ['content: polymorphicOutlet', 'context: polymorphicOutletContext'],
})
export class PolymorphicOutletDirective<C> implements OnChanges, DoCheck {
  public content: PolymorphicContent<C>;
  public context?: C;
  private _view?: EmbeddedViewRef<unknown>;
  private _componentRef?: ComponentRef<unknown>;

  constructor(
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _injector: Injector,
    private readonly _templateRef: TemplateRef<PolymorphicContext<PolymorphicPrimitive>>
  ) {}

  private get template(): TemplateRef<unknown> {
    if (isDirective(this.content)) {
      return this.content.template;
    }

    return this.content instanceof TemplateRef ? this.content : this._templateRef;
  }

  static ngTemplateContextGuard<T>(
    _dir: PolymorphicOutletDirective<T>,
    _ctx: any
  ): _ctx is PolymorphicContext<T extends PolymorphicPrimitive ? T : never> {
    return true;
  }

  public ngOnChanges({ content }: SimpleChanges): void {
    const context = this.getContext();

    if (this._view) {
      this._view.context = context;
    }

    this._componentRef?.injector.get(ChangeDetectorRef).markForCheck();

    if (!content) {
      return;
    }

    this._viewContainerRef.clear();

    if (isComponent(this.content)) {
      this.process(this.content);
    } else if ((context instanceof PolymorphicContext && context.$implicit) != null) {
      this._view = this._viewContainerRef.createEmbeddedView(this.template, context);
    }
  }

  public ngDoCheck() {
    if (isDirective(this.content)) {
      this.content.check();
    }
  }

  private getContext(): unknown {
    if (isTemplate(this.content) || isComponent(this.content)) {
      return this.context;
    }

    return new PolymorphicContext(
      typeof this.content === 'function' ? this.content(this.context!) : this.content
    );
  }

  private process(content: PolymorphicComponent<unknown>): void {
    const injector = content.createInjector(
      this._injector,
      this.context &&
        (new Proxy(this.context as unknown as object, {
          get: (_, key) => this.context?.[key as keyof C],
        }) as unknown as C)
    );

    this._componentRef = this._viewContainerRef.createComponent(
      injector.get(ComponentFactoryResolver).resolveComponentFactory(content.component)
    );
  }
}

function isDirective<C>(content: PolymorphicContent<C>): content is PolymorphicTemplate<C> {
  return content instanceof PolymorphicTemplate;
}

function isComponent<C>(content: PolymorphicContent<C>): content is PolymorphicComponent<any, C> {
  return content instanceof PolymorphicComponent;
}

function isTemplate<C>(content: PolymorphicContent<C>): content is PolymorphicTemplate<C> | TemplateRef<C> {
  return isDirective(content) || content instanceof TemplateRef;
}
