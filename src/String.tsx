import Animated from "react-native-reanimated";

const { concat } = Animated;

export type Concatable = Animated.Adaptable<string> | Animated.Adaptable<number>;
export const string = (strings: readonly string[], ...values: Concatable[]) => {
  if (values.length === 0) {
    return concat(strings[0]);
  }
  const result: Concatable[] = strings.reduce(
    (acc, str, idx) => [...acc, str, values[idx]],
    []
  );
  if (values.length > strings.length) {
    result.push(values[values.length - 1]);
  }
  return concat(...result);
};
