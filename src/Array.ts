import Animated from "react-native-reanimated";

const { Value, cond, eq, or } = Animated;

export const get = (
  array: Animated.Adaptable<number>[],
  index: Animated.Adaptable<number>,
  notFound: Animated.Node<number> = new Value()
): Animated.Node<number> =>
  array.reduce(
    (acc, v, i) => cond(eq(i, index), v, acc),
    notFound
  ) as Animated.Node<number>;

export const contains = (
  values: Animated.Adaptable<number>[],
  value: Animated.Adaptable<number>
): Animated.Node<0 | 1> =>
  values.reduce(
    (acc, v) => or(acc, eq(value, v)),
    new Value(0)
  ) as Animated.Node<0 | 1>;

export const find = (
  values: Animated.Node<number>[],
  fn: (v: Animated.Node<number>) => Animated.Node<number>,
  notFound: Animated.Node<number> = new Value()
) => values.reduce((acc, v) => cond(fn(v), v, acc), notFound);
