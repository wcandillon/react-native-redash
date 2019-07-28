import Animated from "react-native-reanimated";
import {
  State,
  PanGestureHandlerEventExtra,
  GestureHandlerStateChangeNativeEvent,
  PinchGestureHandlerEventExtra,
  RotationGestureHandlerEventExtra,
  TapGestureHandlerEventExtra,
  ForceTouchGestureHandlerEventExtra,
  LongPressGestureHandlerEventExtra,
  FlingGestureHandlerEventExtra
} from "react-native-gesture-handler";

import { runSpring } from "./AnimationRunners";

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
  sub,
  and,
  not,
  clockRunning,
  startClock,
  neq,
  decay: reDecay
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

export const withDecay = (
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  state: Animated.Value<State>,
  deceleration: number = 0.998
) => {
  const clock = new Clock();
  const decayState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const offset = new Value(0);
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

export const spring = (
  translation: Animated.Value<number>,
  state: Animated.Value<State>,
  snapPoint: Animated.Adaptable<number>,
  defaultOffset: number = 0,
  springConfig?: Animated.SpringConfig
) => {
  const springedValue = new Value(0);
  const offset = new Value(defaultOffset);
  const clock = new Clock();
  const rerunSpring = new Value(0);
  // http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
  const config = springConfig || {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001
  };
  return block([
    cond(
      eq(state, State.END),
      [
        set(
          springedValue,
          runSpring(clock, add(translation, offset), snapPoint, config)
        )
      ],
      [
        stopClock(clock),
        cond(eq(state, State.BEGAN), [
          set(rerunSpring, 0),
          set(offset, sub(springedValue, translation))
        ]),
        set(springedValue, add(translation, offset))
      ]
    ),
    springedValue
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
    | ForceTouchGestureHandlerEventExtra);

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
