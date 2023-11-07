import { PolymorphicPrimitive } from "./primitive";

export type PolymorphicHandler<C> = (context: C) => PolymorphicPrimitive
