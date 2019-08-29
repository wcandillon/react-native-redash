import Animated, { Easing } from "react-native-reanimated";

const {
  Clock,
  Value,
  block,
  cond,
  stopClock,
  set,
  startClock,
  clockRunning,
  not,
  and,
  timing: reTiming,
  decay: reDecay,
  spring: reSpring
} = Animated;

interface AnimateProps<S, C> {
  clock: Animated.Clock;
  fn: (
    clock: Animated.Clock,
    state: S,
    config: C
  ) => Animated.Adaptable<number>;
  state: S;
  config: C;
  node: Animated.Adaptable<number>;
}

interface TimingAnimation {
  state: Animated.TimingState;
  config: Animated.TimingConfig;
}

interface SpringAnimation {
  state: Animated.SpringState;
  config: Animated.SpringConfig;
}

interface DecayAnimation {
  state: Animated.DecayState;
  config: Animated.DecayConfig;
}

type Animation = SpringAnimation | DecayAnimation | TimingAnimation;

const animate = <T extends Animation>({
  fn,
  clock,
  state,
  config,
  node
}: AnimateProps<T["state"], T["config"]>) =>
  block([
    cond(not(clockRunning(clock)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, node),
      startClock(clock)
    ]),
    fn(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);

export interface TimingParams {
  clock?: Animated.Clock;
  from?: Animated.Adaptable<number>;
  to?: Animated.Adaptable<number>;
  duration?: Animated.Adaptable<number>;
  easing?: Animated.EasingFunction;
}

export const timing = (params: TimingParams) => {
  const { clock, easing, duration, from, to: toValue } = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    from: 0,
    to: 1,
    ...params
  };

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config: Animated.TimingConfig = {
    toValue,
    duration,
    easing
  };

  return animate<TimingAnimation>({
    clock,
    fn: reTiming,
    state,
    config,
    node: from
  });
};

export interface DecayParams {
  clock?: Animated.Clock;
  node?: Animated.Adaptable<number>;
  velocity?: Animated.Value<number>;
  deceleration?: Animated.Adaptable<number>;
}

export const decay = (params: DecayParams) => {
  const { clock, node, velocity, deceleration } = {
    clock: new Clock(),
    velocity: new Value(0),
    deceleration: 0.998,
    node: 0,
    ...params
  };

  const state: Animated.DecayState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity
  };

  const config: Animated.DecayConfig = {
    deceleration
  };

  return animate<DecayAnimation>({ clock, fn: reDecay, state, config, node });
};

export interface SpringParams {
  clock?: Animated.Clock;
  node?: Animated.Adaptable<number>;
  velocity?: Animated.Value<number>;
  config?: Animated.SpringConfig;
}

export const spring = (params: SpringParams) => {
  const { clock, node, velocity, config: springConfig } = {
    clock: new Clock(),
    velocity: new Value(0),
    node: 0,
    ...params
  };

  const state: Animated.SpringState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity
  };

  const config: Animated.SpringConfig = {
    toValue: new Value(0),
    damping: 6,
    mass: 1,
    stiffness: 64,
    overshootClamping: false,
    restSpeedThreshold: 0.01,
    restDisplacementThreshold: 0.01,
    ...springConfig
  };

  return animate<SpringAnimation>({ clock, fn: reSpring, state, config, node });
};

export const delay = (node: Animated.Node<number>, duration: number) => {
  const clock = new Clock();
  return block([
    timing({ clock, from: 0, to: 1, duration }),
    cond(not(clockRunning(clock)), node)
  ]);
};

export interface LoopProps {
  clock?: Animated.Clock;
  easing?: Animated.EasingFunction;
  duration?: number;
  boomerang?: boolean;
  autoStart?: boolean;
}

export const loop = (loopConfig: LoopProps) => {
  const { clock, easing, duration, boomerang, autoStart } = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    boomerang: false,
    autoStart: true,
    ...loopConfig
  };
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
    cond(and(not(clockRunning(clock)), autoStart ? 1 : 0), startClock(clock)),
    reTiming(clock, state, config),
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
