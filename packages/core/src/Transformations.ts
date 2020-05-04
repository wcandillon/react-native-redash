import Animated from "react-native-reanimated";

import { Vector, vec } from "./Vectors";
import { Transforms2d } from "./Matrix3";

const { divide, sub, multiply, add, cos, sin } = Animated;

export const translateZ = (
  perspective: Animated.Adaptable<number>,
  z: Animated.Adaptable<number>
) => ({ scale: divide(perspective, sub(perspective, z)) });

export const translate = ({ x: translateX, y: translateY }: Vector) => [
  { translateX },
  { translateY },
];

export const transformOrigin = (
  { x, y }: Vector,
  ...transformations: Transforms2d
): Transforms2d => [
  { translateX: x },
  { translateY: y },
  ...transformations,
  { translateX: multiply(x, -1) },
  { translateY: multiply(y, -1) },
];

export const rotateTranslation = (
  tr: Vector,
  rotate: Animated.Adaptable<number>
) => ({
  x: sub(multiply(tr.x, cos(rotate)), multiply(tr.y, sin(rotate))),
  y: add(multiply(tr.x, sin(rotate)), multiply(tr.y, cos(rotate))),
});

export const scaleTranslation = (
  tr: Vector,
  scale: Animated.Adaptable<number>
) => vec.multiply(tr, scale);
