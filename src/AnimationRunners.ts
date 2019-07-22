import Animated from "react-native-reanimated";
import { Platform } from "react-native";

const {
  Clock,
  Value,
  block,
  timing,
  spring,
  cond,
  decay,
  stopClock,
  set,
  startClock,
  clockRunning,
  onChange,
  not
} = Animated;

export function runDecay(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  rerunDecaying: Animated.Value<number>,
  deceleration?: number
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config = {
    deceleration: deceleration || (Platform.OS === "ios" ? 0.998 : 0.985)
  };

  return [
    cond(clockRunning(clock), 0, [
      cond(rerunDecaying, 0, [
        set(rerunDecaying, 1),
        set(state.finished, 0),
        set(state.velocity, velocity),
        set(state.position, value),
        set(state.time, 0),
        startClock(clock)
      ])
    ]),
    decay(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ];
}

export function runSpring(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  dest: Animated.Adaptable<number>,
  config: Animated.SpringConfig = {
    toValue: new Value(0),
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001
  }
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(config.toValue as any, dest),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
}

export function runTiming(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  config: Animated.TimingConfig
) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  return block([
    onChange(config.toValue, set(state.frameTime, 0)),
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
}


export const runDelay = (node: Animated.Node<number>, duration: number) => {
  const clock = new Clock();
  return block([
    runTiming(clock, 0, { toValue: 1, duration, easing: Easing.linear }),
    cond(not(clockRunning(clock)), node)
  ]);
};

export const runLoop = (
  clock: Animated.Clock,
  duration: Animated.Adaptable<number>,
  easing: Animated.EasingFunction,
  boomerang: boolean = false
) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };
  const config = {
    toValue: new Value(1),
    duration,
    easing
  };

  return block([
    cond(not(clockRunning(clock)), startClock(clock)),
    timing(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      boomerang
        ? set(config.toValue, cond(config.toValue, 0, 1))
        : set(state.position, 0)
    ]),
    state.position
  ]);
};
