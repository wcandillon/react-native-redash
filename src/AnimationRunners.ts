import Animated from "react-native-reanimated";

const {
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
} = Animated;

export function runDecay(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  rerunDecaying: Animated.Value<number>,
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    deceleration: 0.99,
  };

  return [
    cond(clockRunning(clock), 0, [
      cond(rerunDecaying, 0, [
        set(rerunDecaying, 1),
        set(state.finished, 0),
        set(state.velocity, velocity),
        set(state.position, value),
        set(state.time, 0),
        startClock(clock),
      ]),
    ]),
    decay(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
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
    restDisplacementThreshold: 0.001,
  },
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue as any, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}

export function runTiming(
  clock: Animated.Clock,
  value: Animated.Adaptable<any>,
  config: Animated.TimingConfig,
) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  return block([
    onChange(config.toValue, set(state.frameTime, 0)),
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}
