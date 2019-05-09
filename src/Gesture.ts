import Animated from "react-native-reanimated";
import { State as GestureState } from "react-native-gesture-handler";

import { runDecay } from "./AnimationRunners";

const {
  Clock,
  Value,
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
  sub,
} = Animated;

type Node = ReturnType<typeof add>;
type Adaptable<T> = Node | T;

export const preserveOffset = (
  value: Adaptable<number>,
  state: GestureState,
) => {
  const previous = new Value(0);
  const offset = new Value(0);

  return block([
    cond(
      eq(state, GestureState.BEGAN),
      [set(previous, 0)],
      [set(offset, add(offset, sub(value, previous))), set(previous, value)],
    ),
    offset,
  ]);
};

export const decay = (
  value: Adaptable<number>,
  state: GestureState,
  velocity: Adaptable<number>,
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
          runDecay(clock, add(value, offset), velocity, rerunDecaying),
        ),
      ],
      [
        stopClock(clock),
        cond(eq(state, GestureState.BEGAN), [
          set(rerunDecaying, 0),
          set(offset, sub(decayedValue, value)),
        ]),
        set(decayedValue, add(value, offset)),
      ],
    ),
    decayedValue,
  ]);
};

export const limit = (
  value: Adaptable<number>,
  state: Adaptable<number>,
  min: number,
  max: number,
) => {
  const offset = new Animated.Value(0);
  const offsetValue = add(offset, value);

  return block([
    cond(eq(state, GestureState.BEGAN), [
      cond(lessThan(offsetValue, min), set(offset, sub(min, value))),
      cond(greaterThan(offsetValue, max), set(offset, sub(max, value))),
    ]),
    cond(
      lessThan(offsetValue, min),
      min,
      cond(greaterThan(offsetValue, max), max, offsetValue),
    ),
  ]);
};

export const preserveMultiplicativeOffset = (
  value: Adaptable<number>,
  state: Adaptable<number>,
) => {
  const previous = new Animated.Value(1);
  const offset = new Animated.Value(1);

  return block([
    cond(
      eq(state, GestureState.BEGAN),
      [set(previous, 1)],
      [
        set(offset, multiply(offset, divide(value, previous))),
        set(previous, value),
      ],
    ),
    offset,
  ]);
};
