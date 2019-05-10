import Animated from "react-native-reanimated";
import { min } from "./Math";

export { default as ReText } from "./ReText";
export { default as Interactable } from "./Interactable";
export {
  atan, atan2, min, max, toRad, toDeg,
} from "./Math";
export { default as interpolateColors } from "./Colors";
export { runSpring, runTiming, runDecay } from "./AnimationRunners";
export {
  preserveOffset, preserveMultiplicativeOffset, decay, limit,
} from "./Gesture";

const {
  event,
  cond,
  Value,
  add,
  multiply,
  abs,
  interpolate,
  divide,
  sub,
  eq,
  or,
} = Animated;

// ## Animations
export const snapPoint = (
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  points: number[],
) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Animated.Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map(p => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce((acc: Animated.Node<any>, p: number) => cond(eq(diffPoint(p), minDelta), p, acc), new Value());
};

export const binaryInterpolation = (
  value: Animated.Adaptable<number>,
  origin: Animated.Adaptable<number>,
  destination: Animated.Adaptable<number>,
) => interpolate(value, {
  inputRange: [0, 1],
  outputRange: [origin, destination],
});

export const find = (
  array: Animated.Adaptable<number>[],
  index: Animated.Adaptable<number>,
  notFound: Animated.Node<any> = new Value(),
) => array.reduce((acc, v, i) => cond(eq(i, index), v, acc), notFound);

export const contains = (
  values: Animated.Node<number>[],
  value: Animated.Node<number>,
): Animated.Node<number> => values.reduce((acc, v) => or(acc, eq(value, v)), new Value(0));

// ## Transformations
export const translateZ = (perspective: Animated.Adaptable<number>, z: Animated.Adaptable<number>) => (
  { scale: divide(perspective, sub(perspective, z)) }
);

// ## Gestures
export const onScroll = (contentOffset: { x?: Animated.Node<number>, y?: Animated.Node<number> }) => event(
  [
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ],
  { useNativeDriver: true },
);
