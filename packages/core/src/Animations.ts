import Animated, { block, defined } from "react-native-reanimated";

import { max, min } from "./Math";

const {
  Value,
  set,
  add,
  multiply,
  cond,
  eq,
  abs,
  sub,
  not,
  lessThan,
  greaterThan,
  divide,
  modulo,
  proc,
} = Animated;

export type SpringConfig = Partial<Omit<Animated.SpringConfig, "toValue">>;
export type TimingConfig = Partial<Omit<Animated.TimingConfig, "toValue">>;

// currently diffClamp() from reanimated seems currently buggy because of proc()
export const diff = (v: Animated.Node<number>) => {
  const stash = new Value(0);
  const prev = new Value<number>();
  return block([
    set(stash, cond(defined(prev), sub(v, prev), 0)),
    set(prev, v),
    stash,
  ]);
};

export const diffClamp = (
  a: Animated.Node<number>,
  minVal: Animated.Adaptable<number>,
  maxVal: Animated.Adaptable<number>
) => {
  const value = new Value<number>();
  return set(
    value,
    min(max(add(cond(defined(value), value, a), diff(a)), minVal), maxVal)
  );
};

export const moving = (
  position: Animated.Node<number>,
  minPositionDelta = 1e-3,
  emptyFrameThreshold = 5
) => {
  const delta = diff(position);
  const noMovementFrames = new Value(0);
  return cond(
    lessThan(abs(delta), minPositionDelta),
    [
      set(noMovementFrames, add(noMovementFrames, 1)),
      not(greaterThan(noMovementFrames, emptyFrameThreshold)),
    ],
    [set(noMovementFrames, 0), 1]
  );
};

export const snapPoint = (
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  points: Animated.Adaptable<number>[]
) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Animated.Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map((p) => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce(
    (acc, p) => cond(eq(diffPoint(p), minDelta), p, acc),
    new Value()
  ) as Animated.Node<number>;
};

export const addTo = proc(
  (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
    set(value, add(value, node))
);

export const subTo = proc(
  (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
    set(value, sub(value, node))
);

export const multiplyTo = proc(
  (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
    set(value, multiply(value, node))
);

export const divideTo = proc(
  (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
    set(value, divide(value, node))
);

export const moduloTo = proc(
  (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
    set(value, modulo(value, node))
);
