import Animated from "react-native-reanimated";

const { concat } = Animated;

export const string = (
  strings: readonly string[],
  ...values: Animated.Adaptable<string | number>[]
): Animated.Node<string> => {
  const result = [];
  strings.forEach((str, idx) => {
    result.push(str, values[idx]);
  });
  if (values.length > strings.length) {
    result.push(values[values.length - 1]);
  }
  // @ts-ignore
  return concat(...result);
};
