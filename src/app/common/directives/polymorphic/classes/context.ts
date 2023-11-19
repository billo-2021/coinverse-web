export class PolymorphicContext<T> {
  public constructor(readonly $implicit: T) {}

  get polymorphicOutlet(): T {
    return this.$implicit;
  }
}
