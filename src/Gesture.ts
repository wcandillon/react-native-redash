import Animated from "react-native-reanimated";
import {
  FlingGestureHandlerEventExtra,
  ForceTouchGestureHandlerEventExtra,
  GestureHandlerStateChangeNativeEvent,
  LongPressGestureHandlerEventExtra,
  PanGestureHandlerEventExtra,
  PinchGestureHandlerEventExtra,
  RotationGestureHandlerEventExtra,
  State,
  TapGestureHandlerEventExtra
} from "react-native-gesture-handler";

import { snapPoint } from "./Animations";

const {
  Clock,
  Value,
  event,
  add,
  block,
  cond,
  divide,
  eq,
  multiply,
  set,
  stopClock,
  and,
  not,
  clockRunning,
  startClock,
  neq,
  call,
  decay: reDecay,
  spring: reSpring
} = Animated;

export const withOffset = (
  value: Animated.Node<number>,
  state: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0)
) =>
  cond(
    eq(state, State.END),
    [set(offset, add(offset, value)), offset],
    add(offset, value)
  );

interface PrivateSpringConfig extends Animated.SpringConfig {
  toValue: Animated.Value<number>;
}

type SpringConfig = Omit<Animated.SpringConfig, "toValue">;

export interface WithSpringParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  snapPoints: Animated.Adaptable<number>[];
  offset?: Animated.Value<number>;
  config?: SpringConfig;
  onSnap?: (value: readonly number[]) => void;
}

export const withSpring = (props: WithSpringParams) => {
  const {
    value,
    velocity,
    state,
    snapPoints,
    offset,
    config: springConfig,
    onSnap
  } = {
    offset: new Value(0),
    ...props
  };
  const clock = new Clock();
  const springState: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config: PrivateSpringConfig = {
    toValue: new Value(0),
    damping: 6,
    mass: 1,
    stiffness: 64,
    overshootClamping: false,
    restSpeedThreshold: 0.01,
    restDisplacementThreshold: 0.01,
    ...springConfig
  };

  const gestureAndAnimationIsOver = new Value(1);
  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [
    set(offset, springState.position),
    stopClock(clock),
    set(gestureAndAnimationIsOver, 1)
  ];
  const snap = onSnap
    ? [cond(clockRunning(clock), call([springState.position], onSnap))]
    : [];
  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(gestureAndAnimationIsOver, set(springState.position, offset)),
    cond(neq(state, State.END), [
      set(gestureAndAnimationIsOver, 0),
      set(springState.finished, 0),
      set(springState.position, add(offset, value))
    ]),
    cond(and(eq(state, State.END), not(gestureAndAnimationIsOver)), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        set(
          config.toValue,
          snapPoint(springState.position, velocity, snapPoints)
        ),
        startClock(clock)
      ]),
      reSpring(clock, springState, config),
      cond(springState.finished, [...snap, ...finishSpring])
    ]),
    springState.position
  ]);
};

interface WithDecayParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
}

export const withDecay = (config: WithDecayParams) => {
  const { value, velocity, state, offset, deceleration } = {
    offset: new Value(0),
    deceleration: 0.998,
    ...config
  };
  const clock = new Clock();
  const decayState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const isDecayInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishDecay = [set(offset, decayState.position), stopClock(clock)];

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(neq(state, State.END), [
      set(decayState.finished, 0),
      set(decayState.position, add(offset, value))
    ]),
    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(decayState.finished)), [
        set(decayState.velocity, velocity),
        set(decayState.time, 0),
        startClock(clock)
      ]),
      reDecay(clock, decayState, { deceleration }),
      cond(decayState.finished, finishDecay)
    ]),
    decayState.position
  ]);
};

export const preserveMultiplicativeOffset = (
  value: Animated.Adaptable<number>,
  state: Animated.Adaptable<number>
) => {
  const previous = new Animated.Value(1);
  const offset = new Animated.Value(1);

  return block([
    cond(
      eq(state, State.BEGAN),
      [set(previous, 1)],
      [
        set(offset, multiply(offset, divide(value, previous))),
        set(previous, value)
      ]
    ),
    offset
  ]);
};

export const onScroll = (contentOffset: {
  x?: Animated.Node<number>;
  y?: Animated.Node<number>;
}) =>
  event([
    {
      nativeEvent: {
        contentOffset
      }
    }
  ]);

type NativeEvent = GestureHandlerStateChangeNativeEvent &
  (
    | PanGestureHandlerEventExtra
    | TapGestureHandlerEventExtra
    | LongPressGestureHandlerEventExtra
    | RotationGestureHandlerEventExtra
    | FlingGestureHandlerEventExtra
    | PinchGestureHandlerEventExtra
    | ForceTouchGestureHandlerEventExtra
  );

type Adaptable<T> = { [P in keyof T]: Animated.Adaptable<T[P]> };

export const onGestureEvent = (
  nativeEvent: Partial<Adaptable<NativeEvent>>
) => {
  const gestureEvent = event([{ nativeEvent }]);
  return {
    onHandlerStateChange: gestureEvent,
    onGestureEvent: gestureEvent
  };
};

export const panGestureHandler = () => {
  const x = new Value(0);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const y = new Value(0);
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    x,
    translationX,
    velocityX,
    y,
    translationY,
    velocityY,
    state
  });
  return {
    x,
    translationX,
    velocityX,
    y,
    translationY,
    velocityY,
    state,
    gestureHandler
  };
};

export const horizontalPanGestureHandler = () => {
  const x = new Value(0);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  return {
    x,
    translationX,
    state,
    velocityX,
    gestureHandler
  };
};

export const verticalPanGestureHandler = () => {
  const y = new Value(0);
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    y,
    translationY,
    velocityY,
    state
  });
  return {
    y,
    translationY,
    state,
    velocityY,
    gestureHandler
  };
};
