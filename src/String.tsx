import Animated from "react-native-reanimated";

const { concat } = Animated;

export const string = (
  strings: ReadonlyArray<Animated.Adaptable<string>>,
  ...values: Animated.Adaptable<string | number>[]
): Animated.Node<string> => {
  const arr = [];
  const n = values.length;
  for (let i = 0; i < n; i += 1) {
    arr.push(strings[i], values[i]);
  }
  const end = strings[n];
  if (end) {
    arr.push(end);
  }
  return concat(...(arr as any));
};
