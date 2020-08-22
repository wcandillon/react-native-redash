import { useEffect } from "react";
import Animated, { Easing, not } from "react-native-reanimated";

import { SpringConfig, TimingConfig } from "./Animations";
import { useConst } from "./Hooks";

const {
  Value,
  cond,
  block,
  set,
  Clock,
  spring,
  startClock,
  stopClock,
  timing,
  neq,
  SpringUtils,
} = Animated;

const defaultSpringConfig = SpringUtils.makeDefaultConfig();

export const withTransition = (
  value: Animated.Node<number>,
  timingConfig: TimingConfig = {}
) => {
  const init = new Value(0);
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: 150,
    easing: Easing.linear,
    ...timingConfig,
  };
  return block([
    cond(not(init), [set(init, 1), set(state.position, value)]),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

export const withSpringTransition = (
  value: Animated.Node<number>,
  springConfig: SpringConfig = defaultSpringConfig,
  velocity: Animated.Adaptable<number> = 0
) => {
  const init = new Value(0);
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
    cond(not(init), [set(init, 1), set(state.position, value)]),
    cond(neq(config.toValue, value), [
      set(state.velocity, velocity),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

export const withTimingTransition = withTransition;

export const useTransition = (
  state: boolean | number,
  config: TimingConfig = {}
) => {
  const value: Animated.Value<number> = useConst(() => new Value(0));
  useEffect(() => {
    value.setValue(typeof state === "boolean" ? (state ? 1 : 0) : state);
  }, [value, state]);
  const transition = useConst(() => withTransition(value, config));
  return transition;
};

export const useSpringTransition = (
  state: boolean | number,
  config: SpringConfig = defaultSpringConfig
) => {
  const value: Animated.Value<number> = useConst(() => new Value(0));

  useEffect(() => {
    value.setValue(typeof state === "boolean" ? (state ? 1 : 0) : state);
  }, [value, state]);

  const transition = useConst(() => withSpringTransition(value, config));
  return transition;
};

export const useTimingTransition = useTransition;
