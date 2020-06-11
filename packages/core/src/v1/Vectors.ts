import Animated from "react-native-reanimated";

import { clamp as clamp1 } from "./Math";

const { Value, block } = Animated;
type Dimension = "x" | "y";
type Fn = (...args: Animated.Adaptable<number>[]) => Animated.Node<number>;
type Adaptable = Vector | Animated.Adaptable<number>;
type SingleArgOp<T extends Adaptable = Adaptable> = [T];
type BinArgOp<T extends Adaptable = Adaptable> = [T, T, ...T[]];

export interface Vector<
  T extends Animated.Adaptable<number> = Animated.Adaptable<number>
> {
  x: T;
  y: T;
}

type Create = {
  (): Vector<0>;
  <T extends Animated.Adaptable<number>>(x: T, y?: T): Vector<T>;
};

const create: Create = <T extends Animated.Adaptable<number>>(
  x?: T,
  y?: T
) => ({
  x: x ?? 0,
  y: y ?? x ?? 0,
});

const createValue = (x = 0, y?: number) =>
  create(new Value(x), new Value(y ?? x));

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
const div = (...vectors: BinArgOp) => apply(Animated.divide, ...vectors);
const mul = (...vectors: BinArgOp) => apply(Animated.multiply, ...vectors);
const pow = (...vectors: [Adaptable, number]) =>
  apply(Animated.pow, ...vectors);
const sqrt = (...vectors: SingleArgOp) => apply(Animated.sqrt, ...vectors);
const cos = (...vectors: SingleArgOp) => apply(Animated.cos, ...vectors);
const sin = (...vectors: SingleArgOp) => apply(Animated.sin, ...vectors);
const min = (vector: Adaptable, value: Animated.Adaptable<number>) =>
  apply(Animated.min, vector, value);
const max = (vector: Adaptable, value: Animated.Adaptable<number>) =>
  apply(Animated.max, vector, value);
const clamp = (value: Adaptable, minVec: Adaptable, maxVec: Adaptable) =>
  apply(clamp1, value, minVec, maxVec);

const minus = (a: Adaptable) => mul(-1, a);

const set = (a: Vector<Animated.Value<number>>, b: Adaptable) =>
  block([
    Animated.set(a.x, isAdaptable(b) ? b : b.x),
    Animated.set(a.y, isAdaptable(b) ? b : b.y),
  ]);

const length = (v: Vector) =>
  Animated.sqrt(Animated.add(Animated.pow(v.x, 2), Animated.pow(v.y, 2)));
const normalize = (v: Vector) => div(v, length(v));
const dot = (v1: Vector, v2: Vector) =>
  add(Animated.multiply(v1.x, v2.x), Animated.multiply(v1.y, v2.y));
const cross = (v1: Vector, v2: Vector) =>
  sub(Animated.multiply(v1.x, v2.y), Animated.multiply(v1.y, v2.x));

export const vec = {
  create,
  createValue,
  minus,
  add,
  sub,
  dot,
  div,
  mul,
  multiply: mul,
  divide: div,
  pow,
  sqrt,
  set,
  clamp,
  apply,
  min,
  max,
  cos,
  sin,
  length,
  normalize,
  cross,
};
