import type Animated from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";

/**
 * @summary Type representing a vector
 * @example
   export interface Vector<T = number> {
    x: T;
    y: T;
  }
 */
export interface Vector<T = number> {
  x: T;
  y: T;
}

/**
 * @summary Returns a vector of shared values
 */
export const useVector = (
  x1 = 0,
  y1?: number
): Vector<Animated.SharedValue<number>> => {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);
  return { x, y };
};

type Create = {
  (): Vector<0>;
  <T extends Animated.Adaptable<number>>(x: T, y?: T): Vector<T>;
};

/**
 *
 * @param x
 * @param y
 * @worklet
 */
export const vec2: Create = <T extends Animated.Adaptable<number>>(
  x?: T,
  y?: T
) => {
  "worklet";
  return {
    x: x ?? 0,
    y: y ?? x ?? 0,
  };
};

export const vec = {
  create: vec2,
};
