import Animated, {Easing} from "react-native-reanimated";
import { min } from "./Math";

export { default as ReText } from "./ReText";
export { default as Interactable } from "./Interactable";
export {
  atan, atan2, min, max, toRad, toDeg,
} from "./Math";
export { default as interpolateColors } from "./Colors";

const {
  event,
  spring,
  cond,
  set,
  clockRunning,
  startClock,
  stopClock,
  Value,
  add,
  multiply,
  abs,
  interpolate,
  divide,
  sub,
  eq,
  block,
  debug,
  timing,
  Clock,
  Node,
} = Animated;

export { timing, clockRunning, add };

export type TimingConfig = Parameters<typeof timing>[1];
export type Clock = Parameters<typeof clockRunning>[0];
export type Node = ReturnType<typeof add>;
export type Adaptable<T> = Node | T;

// ## Animations
export const snapPoint = (value: Adaptable<number>, velocity: Adaptable<number>, points: number[]) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map(p => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce((acc: Node, p: number) => cond(eq(diffPoint(p), minDelta), p, acc), new Value());
};

export const binaryInterpolation = (
  value: Adaptable<number>,
  origin: Adaptable<number>,
  destination: Adaptable<number>,
) => interpolate(value, {
  inputRange: [0, 1],
  outputRange: [origin, destination],
});

export const lookup = (
  array: Adaptable<number>[],
  index: Adaptable<number>,
  notFound: Node = new Value(),
) => array.reduce((acc, v, i) => cond(eq(i, index), v, acc), notFound);

export function runSpring(clock: Clock, value: Adaptable<number>, dest: Adaptable<number>) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

export function runTiming(clock: Clock, value: Adaptable<any>, timingConfig: Partial<TimingConfig> & { toValue: number }) {
  const config = { duration: 300, easing: Easing.inOut(Easing.ease), ...timingConfig };
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

// ## Transformations
export const translateZ = (perspective: Adaptable<number>, z: Adaptable<number>) => (
  { scale: divide(perspective, sub(perspective, z)) }
);

// ## Gestures
export const onScroll = (contentOffset: { x?: Node, y?: Node }) => event(
  [
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ],
  { useNativeDriver: true },
);
