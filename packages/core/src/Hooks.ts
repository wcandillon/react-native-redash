import Animated from "react-native-reanimated";
import { useRef } from "react";
import {
  onGestureEvent,
  panGestureHandler,
  pinchGestureHandler,
  rotationGestureHandler,
  tapGestureHandler,
  scrollHandler,
} from "./Gesture";
import { Vector, vec } from "./Vectors";
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
export const useRotationGestureHandler = () =>
  useLazyRef(() => rotationGestureHandler());
export const usePinchGestureHandler = () =>
  useLazyRef(() => pinchGestureHandler());
export const useTapGestureHandler = () => useLazyRef(() => tapGestureHandler());
export const useScrollHandler = () => useLazyRef(() => scrollHandler());

type Atomic = string | number | boolean;

export const useVector = (
  ...defaultValues: Parameters<typeof vec.createValue>
) => useLazyRef(() => vec.createValue(...defaultValues));

type P = Parameters<typeof vec.createValue>;
type R = Vector<Animated.Value<number>>;
type UseVectors = {
  (...v: [P]): [R];
  (...v: [P, P]): [R, R];
  (...v: [P, P, P]): [R, R, R];
  (...v: [P, P, P, P]): [R, R, R, R];
  (...v: [P, P, P, P, P]): [R, R, R, R, R];
  (...v: [P, P, P, P, P, P]): [R, R, R, R, R, R];
  (...v: P[]): R[];
};

export const useVectors = (((
  ...defaultValues: Parameters<typeof vec.createValue>[]
) =>
  useLazyRef(() =>
    defaultValues.map((values) => vec.createValue(...values))
  )) as unknown) as UseVectors;

export const useClock = () => useLazyRef(() => new Clock());

export const useValue = <V extends Atomic>(value: V) =>
  useLazyRef(() => new Value(value));

export const useLoop = (duration = 1000, boomerang = true) => {
  const progress = useValue(0);
  useCode(() => set(progress, loop({ duration, boomerang })), [progress]);
  return progress;
};

type UseValues = {
  <V extends Atomic>(v: V): [Animated.Value<V>];
  <V1 extends Atomic, V2 extends Atomic>(v1: V1, v2: V2): [
    Animated.Value<V1>,
    Animated.Value<V2>
  ];
  <V1 extends Atomic, V2 extends Atomic, V3 extends Atomic>(
    v1: V1,
    v2: V2,
    v3: V3
  ): [Animated.Value<V1>, Animated.Value<V2>, Animated.Value<V3>];
  <V1 extends Atomic, V2 extends Atomic, V3 extends Atomic, V4 extends Atomic>(
    v1: V1,
    v2: V2,
    v3: V3,
    v4: V4
  ): [
    Animated.Value<V1>,
    Animated.Value<V2>,
    Animated.Value<V3>,
    Animated.Value<V4>
  ];
  <
    V1 extends Atomic,
    V2 extends Atomic,
    V3 extends Atomic,
    V4 extends Atomic,
    V5 extends Atomic
  >(
    v1: V1,
    v2: V2,
    v3: V3,
    v4: V4,
    v5: V5
  ): [
    Animated.Value<V1>,
    Animated.Value<V2>,
    Animated.Value<V3>,
    Animated.Value<V4>,
    Animated.Value<V5>
  ];
  <V extends Atomic>(...values: V[]): Animated.Value<V>[];
};

export const useValues = ((<V extends Atomic>(...values: [V, ...V[]]) =>
  useLazyRef(() => values.map((v) => new Value(v)))) as unknown) as UseValues;

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
