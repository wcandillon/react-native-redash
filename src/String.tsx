import Animated from "react-native-reanimated";

const { concat } = Animated;

export type Concatable =
  | Animated.Adaptable<string>
  | Animated.Adaptable<number>;

export const string = (
  strings: readonly string[],
  ...values: readonly Concatable[]
) => {
  if (values.length === 0) {
    return concat(strings[0]);
  }
  const result = values.reduce<Concatable[]>(
    (acc, v, idx) => [...acc, strings[idx], v],
    []
  );
  result.push(strings[strings.length - 1]);
  return concat(...result);
};
