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
  clockRunning,
  Value,
  add,
  multiply,
  abs,
  interpolate,
  divide,
  sub,
  eq,
  timing,
  Node,
} = Animated;

export { timing, clockRunning, add };

export type TimingConfig = Parameters<typeof timing>[1];
export type Clock = Parameters<typeof clockRunning>[0];
export type Node = ReturnType<typeof add>;
export type Adaptable<T> = Node | T;

// ## Animations
export const snapPoint = (value: Adaptable<number>, velocity: Adaptable<number>, points: number[]) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map(p => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce((acc: Node, p: number) => cond(eq(diffPoint(p), minDelta), p, acc), new Value());
};

export const binaryInterpolation = (
  value: Adaptable<number>,
  origin: Adaptable<number>,
  destination: Adaptable<number>,
) => interpolate(value, {
  inputRange: [0, 1],
  outputRange: [origin, destination],
});

export const lookup = (
  array: Adaptable<number>[],
  index: Adaptable<number>,
  notFound: Node = new Value(),
) => array.reduce((acc, v, i) => cond(eq(i, index), v, acc), notFound);

// ## Transformations
export const translateZ = (perspective: Adaptable<number>, z: Adaptable<number>) => (
  { scale: divide(perspective, sub(perspective, z)) }
);

// ## Gestures
export const onScroll = (contentOffset: { x?: Node, y?: Node }) => event(
  [
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ],
  { useNativeDriver: true },
);
