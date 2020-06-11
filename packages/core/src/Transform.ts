import { useAnimatedStyle } from "react-native-reanimated";

import {Transforms2d} from "./Matrix3";
import { Vector } from "./Vector";

export const useTranslate = (vector: Vector) =>
  useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: vector.x.value },
        { translateY: vector.y.value },
      ],
    };
  });


  export const translateZ = (
    perspective,
    z
  ) => {
    "worklet";
    return { scale: perspective / (perspective - z) };
  }
  
  export const translate = ({ x: translateX, y: translateY }: Vector) => {
    "worklet";
    return [
      { translateX },
      { translateY },
    ];
  };
  
  export const transformOrigin = (
    { x, y },
    ...transformations
  ): Transforms2d => {
    "worklet";
    return [
      { translateX: x },
      { translateY: y },
      ...transformations,
      { translateX: -x },
      { translateY:-y },
    ];
  }
  
  export const rotateTranslation = (
    tr,
    rotate
  ) => {
    "worklet";
    return ({
      x: ((tr.x * Math.cos(rotate)) - (tr.y * Math.sin(rotate))),
      y: ((tr.x * Math.sin(rotate)) + (tr.y * Math.cos(rotate))),
    })
  };
  
  export const scaleTranslation = (
    tr,
    scale
  ) => {
    "worklet";
    return vec.multiply(tr, scale)
  };