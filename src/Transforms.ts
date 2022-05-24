import type { TransformsStyle } from "react-native";
import type Animated from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

import type { Vector } from "./Vectors";
import type { Transforms2d } from "./Matrix3";

type RNTransform = Exclude<TransformsStyle["transform"], undefined>;

export const transformOrigin = (
  { x, y }: Vector,
  transformations: RNTransform
): RNTransform => {
  "worklet";
  return ([{ translateX: x }, { translateY: y }] as RNTransform)
    .concat(transformations)
    .concat([{ translateX: -x }, { translateY: -y }]);
};

export const transformOrigin2d = (
  { x, y }: Vector,
  transformations: Transforms2d
): Transforms2d => {
  "worklet";
  return ([{ translateX: x }, { translateY: y }] as Transforms2d)
    .concat(transformations)
    .concat([{ translateX: -x }, { translateY: -y }]);
};

export const useTranslation = ({
  x,
  y,
}: Vector<Animated.SharedValue<number>>) =>
  useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));
