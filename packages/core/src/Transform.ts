import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Vector } from "./Vector";

export const useTranslate = (vector: Vector<Animated.SharedValue<number>>) =>
  useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: vector.x.value },
        { translateY: vector.y.value },
      ],
    };
  });

export const translateZ = (perspective: number, z: number) => {
  "worklet";
  return { scale: perspective / (perspective - z) };
};

export const translate = ({ x: translateX, y: translateY }: Vector) => {
  "worklet";
  return [{ translateX }, { translateY }];
};

export const transformOrigin = (
  v: Vector,
  transformations: Animated.AnimatedTransform[]
) => {
  "worklet";
  return [
    { translateX: v.x },
    { translateY: v.y },
    ...transformations,
    { translateX: -v.x },
    { translateY: -v.y },
  ];
};

export const rotateTranslation = (tr: Vector, rotate: number) => {
  "worklet";
  return {
    x: tr.x * Math.cos(rotate) - tr.y * Math.sin(rotate),
    y: tr.x * Math.sin(rotate) + tr.y * Math.cos(rotate),
  };
};

export const scaleTranslation = (tr: Vector, scale: number) => {
  "worklet";
  return {
    x: tr.x * scale,
    y: tr.y * scale,
  };
};
