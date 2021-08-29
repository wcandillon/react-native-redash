import type { TransformsStyle } from "react-native";

import type { Vector } from "./Vectors";
import type { Transforms2d } from "./Matrix3";

type RNTransform = Exclude<TransformsStyle["transform"], undefined>;

export const transformOrigin = (
  { x, y }: Vector,
  transformations: RNTransform
): RNTransform => {
  "worklet";
  return [
    { translateX: x },
    { translateY: y },
    ...transformations,
    { translateX: -x },
    { translateY: -y },
  ];
};

export const transform2d = (
  { x, y }: Vector,
  transformations: Transforms2d
): Transforms2d => {
  "worklet";
  return [
    { translateX: x },
    { translateY: y },
    ...transformations,
    { translateX: -x },
    { translateY: -y },
  ];
};
