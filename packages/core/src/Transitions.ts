import { useMemo } from "react";
import Animated, { Easing } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

import { bin } from "./Math";
import { SpringConfig, TimingConfig } from "./Animations";

const {
  Value,
  cond,
  eq,
  block,
  set,
  Clock,
  spring,
  startClock,
  timing,
  neq,
  useCode,
  SpringUtils,
} = Animated;

const defaultSpringConfig = SpringUtils.makeDefaultConfig();

export const withTransition = (
  value: Animated.Node<number>,
  timingConfig: TimingConfig = {},
  gestureState: Animated.Value<State> = new Value(State.UNDETERMINED)
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear,
    ...timingConfig,
  };
  return block([
    startClock(clock),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
    ]),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.position, value)],
      timing(clock, state, config)
    ),
    state.position,
  ]);
};

export const withSpringTransition = (
  value: Animated.Node<number>,
  springConfig: SpringConfig = defaultSpringConfig,
  velocity: Animated.Adaptable<number> = 0,
  gestureState: Animated.Value<State> = new Value(State.UNDETERMINED)
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...springConfig,
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.velocity, velocity), set(state.position, value)],
      spring(clock, state, config)
    ),
    state.position,
  ]);
};

export const withTimingTransition = withTransition;

export const useTransition = (
  state: boolean | number,
  config: TimingConfig = {}
) => {
  const value = useMemo(() => new Value(0), []);
  useCode(() => set(value, typeof state === "boolean" ? bin(state) : state), [
    state,
    value,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transition = useMemo(() => withTransition(value, config), []);
  return transition;
};

export const useSpringTransition = (
  state: boolean | number,
  config: SpringConfig = defaultSpringConfig
) => {
  const value = useMemo(() => new Value(0), []);
  useCode(() => set(value, typeof state === "boolean" ? bin(state) : state), [
    state,
    value,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transition = useMemo(() => withSpringTransition(value, config), []);
  return transition;
};

export const useTimingTransition = useTransition;
