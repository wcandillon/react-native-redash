import Animated from "react-native-reanimated";
import { TransformsStyle } from "react-native";

import { Point } from "./Coordinates";

const { divide, sub, multiply } = Animated;

type AnimatedTransform = {
  [P in keyof TransformsStyle["transform"]]: Animated.Adaptable<
    TransformsStyle["transform"][P]
  >;
};

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
  ...transformations: AnimatedTransform[]
): AnimatedTransform[] => [
  { translateX: x },
  { translateY: y },
  ...transformations,
  { translateX: multiply(x, -1) },
  { translateY: multiply(y, -1) },
];
