import Animated from "react-native-reanimated";

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
  add,
} = Animated;

export {
  timing, spring, clockRunning, add,
};

export type SpringConfig= Parameters<typeof spring>[1];
export type TimingConfig = Parameters<typeof timing>[1];
export type Clock = Parameters<typeof clockRunning>[0];
export type Node = ReturnType<typeof add>;
export type Adaptable<T> = Node | T;

export function runDecay(
  clock: Clock,
  value: Adaptable<number>,
  velocity: Adaptable<number>,
  rerunDecaying: any,
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
  clock: Clock,
  value: Adaptable<number>,
  dest: Adaptable<number>,
  config: SpringConfig = {
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
  clock: Clock,
  value: Adaptable<any>,
  config: TimingConfig,
) {
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
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}
