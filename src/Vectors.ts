import Animated, { useSharedValue } from "react-native-reanimated";

export interface Vector<T = number> {
  x: T;
  y: T;
}

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

const create: Create = <T extends Animated.Adaptable<number>>(x?: T, y?: T) => {
  "worklet";
  return {
    x: x ?? 0,
    y: y ?? x ?? 0,
  };
};

export const vec = {
  create,
};
