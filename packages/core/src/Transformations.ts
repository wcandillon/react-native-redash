import Animated from "react-native-reanimated";

import { Point } from "./Coordinates";

const { divide, sub, multiply } = Animated;

export const translateZ = (
  perspective: Animated.Adaptable<number>,
  z: Animated.Adaptable<number>
) => ({ scale: divide(perspective, sub(perspective, z)) });

export const translate = ({ x: translateX, y: translateY }: Point) => [
  { translateX },
  { translateY },
];

export const transformOrigin = (
  { x, y }: Point,
  ...transformations: Animated.AnimatedTransform[]
): Animated.AnimatedTransform[] => [
  { translateX: x },
  { translateY: y },
  ...transformations,
  { translateX: multiply(x, -1) },
  { translateY: multiply(y, -1) },
];
