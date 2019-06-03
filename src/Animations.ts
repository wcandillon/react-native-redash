import Animated from "react-native-reanimated";

import { min } from "./Math";

const {
  Value,
  add,
  multiply,
  cond,
  eq,
  abs,
  sub,
  interpolate,
  divide
} = Animated;

export const snapPoint = (
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  points: number[]
) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Animated.Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map(p => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce(
    (acc: Animated.Node<any>, p: number) =>
      cond(eq(diffPoint(p), minDelta), p, acc),
    new Value()
  );
};

export const bInterpolate = (
  value: Animated.Adaptable<number>,
  origin: Animated.Adaptable<number>,
  destination: Animated.Adaptable<number>
) =>
  interpolate(value, {
    inputRange: [0, 1],
    outputRange: [origin, destination]
  });

export const translateZ = (
  perspective: Animated.Adaptable<number>,
  z: Animated.Adaptable<number>
) => ({ scale: divide(perspective, sub(perspective, z)) });
