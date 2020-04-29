/* eslint-disable react-hooks/exhaustive-deps */
import Animated from "react-native-reanimated";
import { useRef } from "react";
import {
  horizontalPanGestureHandler,
  onGestureEvent,
  panGestureHandler,
  verticalPanGestureHandler,
} from "./Gesture";
import { vec } from "./Vectors";
import { loop } from "./AnimationRunners";

const { Clock, Value, diff, set, useCode, debug, block } = Animated;

const useLazyRef = <T>(initializer: () => T) => {
  const ref = useRef<T>();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};

export const useGestureHandler = (
  nativeEvent: Parameters<typeof onGestureEvent>[0]
) => useLazyRef(() => onGestureEvent(nativeEvent));

export const usePanGestureHandler = () => useLazyRef(() => panGestureHandler());

export const useVerticalPanGestureHandler = () =>
  useLazyRef(() => verticalPanGestureHandler());

export const useHorizontalPanGestureHandler = () =>
  useLazyRef(() => horizontalPanGestureHandler());

type Atomic = string | number | boolean;

export const useVector = (x: number, y: number) =>
  useLazyRef(() => vec.createValue(x, y));

export const useClock = () => useLazyRef(() => new Clock());

export const useValue = <V extends Atomic>(value: V) =>
  useLazyRef(() => new Value(value));

export const useLoop = (duration = 1000, boomerang = false) => {
  const progress = useValue(0);
  useCode(() => set(progress, loop({ duration, boomerang })), [progress]);
  return progress;
};

export const useValues = <V extends Atomic>(values: V[]): Animated.Value<V>[] =>
  useLazyRef(() => values.map((v) => new Value(v)));

export const useClocks = (numberOfClocks: number): Animated.Clock[] =>
  useLazyRef(() => new Array(numberOfClocks).fill(0).map(() => new Clock()));

export const useDiff = (node: Animated.Node<number>) => {
  const dDiff = useValue(0);
  useCode(() => set(dDiff, diff(node)), [dDiff, node]);
  return dDiff;
};

export const useDebug = (values: { [key: string]: Animated.Node<number> }) => {
  const keys = Object.keys(values);
  useCode(() => block(keys.map((name) => debug(name, values[name]))), [
    keys,
    values,
  ]);
};
