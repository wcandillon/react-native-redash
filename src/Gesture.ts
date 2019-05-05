import Animated from "react-native-reanimated";
import { State as GestureState } from "react-native-gesture-handler";

import { runDecay } from "./AnimationRunners";

const {
  Clock, Value, add, block, cond, eq, set, stopClock, sub,
} = Animated;

type Node = ReturnType<typeof add>;
type Adaptable<T> = Node | T;

export const preserveOffset = (
  value: Adaptable<number>,
  state: GestureState,
) => {
  const prev = new Value(0);
  const offset = new Value(0);

  return block([
    cond(
      eq(state, GestureState.BEGAN),
      [set(prev, 0)],
      [set(offset, add(offset, sub(value, prev))), set(prev, value)],
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
