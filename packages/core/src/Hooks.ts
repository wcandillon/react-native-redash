/* eslint-disable react-hooks/exhaustive-deps */
import { useMemoOne } from "use-memo-one";
import Animated, {
  Clock,
  Value,
  diff,
  set,
  useCode,
} from "react-native-reanimated";
import {
  horizontalPanGestureHandler,
  onGestureEvent,
  panGestureHandler,
  verticalPanGestureHandler,
} from "./Gesture";
import { vec } from "./Vectors";

type Dependencies = readonly unknown[];

export const useGestureHandler = (
  nativeEvent: Parameters<typeof onGestureEvent>[0],
  deps: Dependencies
) => useMemoOne(() => onGestureEvent(nativeEvent), deps);

export const usePanGestureHandler = (deps: Dependencies) =>
  useMemoOne(() => panGestureHandler(), deps);

export const useVerticalPanGestureHandler = (deps: Dependencies) =>
  useMemoOne(() => verticalPanGestureHandler(), deps);

export const useHorizontalPanGestureHandler = (deps: Dependencies) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemoOne(() => horizontalPanGestureHandler(), deps);

type Atomic = string | number | boolean;

export const useVector = (x: number, y: number, deps: Dependencies) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemoOne(() => vec.createValue(x, y), deps);

export const useClock = (deps: Dependencies) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemoOne(() => new Clock(), deps);

export const useValue = <V extends Atomic>(value: V, deps: Dependencies) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemoOne(() => new Value(value), deps);

export const useValues = <V extends Atomic>(
  values: V[],
  deps: Dependencies
): Animated.Value<V>[] =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemoOne(() => values.map((v) => new Value(v)), deps);

export const useNamedValues = <V extends Atomic, K extends string>(
  values: Record<K, V>,
  deps: Dependencies
): Record<K, Animated.Value<V>> =>
  useMemoOne(() => {
    const result: Record<string, Animated.Value<V>> = {};
    Object.keys(values).forEach((key) => {
      result[key as K] = new Value(values[key as K]);
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

export const useClocks = (
  numberOfClocks: number,
  deps: Dependencies
): Animated.Clock[] =>
  useMemoOne(
    () => new Array(numberOfClocks).fill(0).map(() => new Clock()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

export const useDiff = (node: Animated.Node<number>, deps: Dependencies) => {
  const [dDiff] = useValues<number>([0], deps);
  useCode(() => set(dDiff, diff(node)), [dDiff, node]);
  return dDiff;
};
