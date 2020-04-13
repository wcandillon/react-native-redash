import Animated from "react-native-reanimated";

import { clamp as clamp1 } from "./Math";

const { Value, block } = Animated;
type Dimension = "x" | "y";
type Fn = (...args: Animated.Adaptable<number>[]) => Animated.Node<number>;
type Adaptable = Vector | Animated.Adaptable<number>;
type BinArgOp<T extends Adaptable = Adaptable> = [T, T, ...T[]];

export interface Vector<
  T extends Animated.Adaptable<number> = Animated.Adaptable<number>
> {
  x: T;
  y: T;
}

const create = <T extends Animated.Adaptable<number>>(x: T, y?: T) => ({
  x,
  y: y || x,
});

const createValue = (x: number, y?: number) =>
  create(new Value(x), new Value(y || x));

const isAdaptable = (value: Adaptable): value is Animated.Adaptable<number> =>
  typeof value === "number" ||
  value instanceof Animated.Node ||
  value instanceof Animated.Value;

const get = (vectors: Adaptable[], dimension: Dimension) =>
  vectors.map((vector) => (isAdaptable(vector) ? vector : vector[dimension]));

const apply = (fn: Fn, ...vectors: Adaptable[]) => ({
  x: fn(...get(vectors, "x")),
  y: fn(...get(vectors, "y")),
});

const add = (...vectors: BinArgOp) => apply(Animated.add, ...vectors);
const sub = (...vectors: BinArgOp) => apply(Animated.sub, ...vectors);
const dot = (...vectors: BinArgOp) => apply(Animated.multiply, ...vectors);
const div = (...vectors: BinArgOp) => apply(Animated.divide, ...vectors);
const clamp = (value: Vector, min: Vector, max: Vector) =>
  apply(clamp1, value, min, max);

const invert = (a: Vector) => dot(-1, a);

const set = (a: Vector<Animated.Value<number>>, b: Vector) =>
  block([Animated.set(a.x, b.x), Animated.set(a.y, b.y)]);

export const vec = {
  create,
  createValue,
  invert,
  add,
  sub,
  dot,
  div,
  multiply: dot,
  divide: div,
  set,
  clamp,
  apply,
};
