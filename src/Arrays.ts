import Animated from "react-native-reanimated";

const {
  Value, cond, eq, or,
} = Animated;

export const find = (
  array: Animated.Adaptable<number>[],
  index: Animated.Adaptable<number>,
  notFound: Animated.Node<any> = new Value(),
) => array.reduce((acc, v, i) => cond(eq(i, index), v, acc), notFound);

export const contains = (
  values: Animated.Node<number>[],
  value: Animated.Node<number>,
): Animated.Node<number> => values.reduce((acc, v) => or(acc, eq(value, v)), new Value(0));
