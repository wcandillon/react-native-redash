import Animated from "react-native-reanimated";
import { State as GestureState } from "react-native-gesture-handler";

import { runDecay, runSpring } from "./AnimationRunners";

const {
  Clock,
  Value,
  event,
  add,
  block,
  cond,
  divide,
  eq,
  greaterThan,
  lessThan,
  multiply,
  set,
  stopClock,
  sub
} = Animated;

export const preserveOffset = (
  value: Animated.Adaptable<number>,
  state: Animated.Adaptable<GestureState>
) => {
  const previous = new Value(0);
  const offset = new Value(0);

  return block([
    cond(
      eq(state, GestureState.BEGAN),
      [set(previous, 0)],
      [set(offset, add(offset, sub(value, previous))), set(previous, value)]
    ),
    offset
  ]);
};

export const decay = (
  value: Animated.Adaptable<number>,
  state: Animated.Adaptable<GestureState>,
  velocity: Animated.Adaptable<number>
) => {
  const decayedValue = new Value(0);
  const offset = new Value(0);
  const clock = new Clock();
  const rerunDecaying = new Value(0);

  return block([
    cond(
      eq(state, GestureState.END),
      [
        set(
          decayedValue,
          runDecay(clock, add(value, offset), velocity, rerunDecaying)
        )
      ],
      [
        stopClock(clock),
        cond(eq(state, GestureState.BEGAN), [
          set(rerunDecaying, 0),
          set(offset, sub(decayedValue, value))
        ]),
        set(decayedValue, add(value, offset))
      ]
    ),
    decayedValue
  ]);
};

export const spring = (
  translation: Animated.Value<number>,
  state: Animated.Value<GestureState>,
  snapPoint: number,
  defaultOffset: number = 0
) => {
  const springedValue = new Value(0);
  const offset = new Value(defaultOffset);
  const clock = new Clock();
  const rerunSpring = new Value(0);
  // http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
  const springConfig = {
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
      eq(state, GestureState.END),
      [
        set(
          springedValue,
          runSpring(clock, add(translation, offset), snapPoint, springConfig)
        )
      ],
      [
        stopClock(clock),
        cond(eq(state, GestureState.BEGAN), [
          set(rerunSpring, 0),
          set(offset, sub(springedValue, translation))
        ]),
        set(springedValue, add(translation, offset))
      ]
    ),
    springedValue
  ]);
};

export const limit = (
  value: Animated.Adaptable<number>,
  state: Animated.Adaptable<GestureState>,
  min: number,
  max: number
) => {
  const offset = new Animated.Value(0);
  const offsetValue = add(offset, value);

  return block([
    cond(eq(state, GestureState.BEGAN), [
      cond(lessThan(offsetValue, min), set(offset, sub(min, value))),
      cond(greaterThan(offsetValue, max), set(offset, sub(max, value)))
    ]),
    cond(
      lessThan(offsetValue, min),
      min,
      cond(greaterThan(offsetValue, max), max, offsetValue)
    )
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
      eq(state, GestureState.BEGAN),
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
  event(
    [
      {
        nativeEvent: {
          contentOffset
        }
      }
    ]
  );
