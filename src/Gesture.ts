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

import { decay, runSpring } from "./AnimationRunners";

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
  sub
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

export const widthDecay = (
  value: Animated.Node<number>,
  velocity: Animated.Node<number>,
  state: Animated.Value<State>
) => cond(eq(state, State.END), decay({ value, velocity }), value);

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
