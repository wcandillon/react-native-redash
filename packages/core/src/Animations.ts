import Animated from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";

import { min } from "./Math";

const {
  Clock,
  Value,
  set,
  add,
  multiply,
  cond,
  eq,
  abs,
  sub,
  not,
  diff,
  lessThan,
  greaterThan,
  useCode,
  divide,
  modulo,
  proc,
} = Animated;

export type SpringConfig = Partial<Omit<Animated.SpringConfig, "toValue">>;
export type TimingConfig = Partial<Omit<Animated.TimingConfig, "toValue">>;

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

export const bInterpolate = proc(
  (
    value: Animated.Adaptable<number>,
    origin: Animated.Adaptable<number>,
    destination: Animated.Adaptable<number>
  ) => add(origin, multiply(value, sub(destination, origin)))
);

type Dependencies = readonly unknown[];
type Atomic = string | number | boolean;

export const useValues = <V extends Atomic>(
  values: V[],
  deps: Dependencies
): Animated.Value<V>[] =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemoOne(() => values.map((v) => new Value(v)), deps);

export const useNamedValues = <V extends Atomic, K extends string>(
  values: Record<K, V>,
  deps: Dependencies
): Record<K, Animated.Value<V>> =>
  useMemoOne(() => {
    const result: Record<string, Animated.Value<V>> = {};
    Object.keys(values).forEach((key) => {
      result[key as K] = new Value(values[key as K]);
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

export const useClocks = (
  numberOfClocks: number,
  deps: Dependencies
): Animated.Clock[] =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemoOne(() => new Array(numberOfClocks).fill(0).map(() => new Clock()), [
    deps,
  ]);

export const useDiff = (node: Animated.Node<number>, deps: Dependencies) => {
  const [dDiff] = useValues<number>([0], deps);
  useCode(() => set(dDiff, diff(node)), [dDiff, node]);
  return dDiff;
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
