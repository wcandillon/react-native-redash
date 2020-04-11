import Animated from "react-native-reanimated";

import { clamp as clamp1 } from "./Math";

const { Value, block } = Animated;
type Dimensions = "x" | "y";
type Fn = (...args: Animated.Adaptable<number>[]) => Animated.Node<number>;
type BinArgOp<T extends Animated.Adaptable<number> | Vector = Vector> = [
  T,
  T,
  ...T[]
];

export interface Vector<
  T extends Animated.Adaptable<number> = Animated.Adaptable<number>
> {
  x: T;
  y: T;
}

const create = (x: number, y: number) => ({
  x,
  y,
});

const createValue = (x: number, y: number) => ({
  x: new Value(x),
  y: new Value(y),
});

const get = (vectors: Vector[], dimensions: Dimensions) =>
  vectors.map((vector) => vector[dimensions]);

const apply = (fn: Fn, ...vectors: Vector[]) => ({
  x: fn(...get(vectors, "x")),
  y: fn(...get(vectors, "y")),
});

const add = (...vectors: BinArgOp) => apply(Animated.add, ...vectors);
const sub = (...vectors: BinArgOp) => apply(Animated.sub, ...vectors);
const multiply = (...vectors: BinArgOp) => apply(Animated.multiply, ...vectors);
const divide = (...vectors: BinArgOp) => apply(Animated.divide, ...vectors);
const clamp = (value: Vector, min: Vector, max: Vector) =>
  apply(clamp1, value, min, max);

const invert = (a: Vector) => multiply({ x: -1, y: -1 }, a);

const set = (a: Vector<Animated.Value<number>>, b: Vector) =>
  block([Animated.set(a.x, b.x), Animated.set(a.y, b.y)]);

export const vec = {
  create,
  createValue,
  invert,
  add,
  sub,
  multiply,
  divide,
  set,
  clamp,
};
