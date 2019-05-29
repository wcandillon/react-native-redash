import Animated from "react-native-reanimated";
import { min } from "./Math";

export { default as ReText } from "./ReText";
export { default as Interactable } from "./Interactable";
export * from "./Math";
export * from "./Colors";
export * from "./AnimationRunners";
export * from "./Gesture";
export * from "./Arrays";
export * from "./SVG";
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
