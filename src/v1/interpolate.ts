import Animated from "react-native-reanimated";

const {
  divide,
  add,
  multiply,
  sub,
  cond,
  and,
  greaterOrEq,
  lessOrEq,
} = Animated;

const lerp = (
  v0: Animated.Adaptable<number>,
  v1: Animated.Adaptable<number>,
  t: Animated.Adaptable<number>
) => multiply(sub(1, t), add(v0, t), v1);

export const interpolateNode = (
  value: Animated.Adaptable<number>,
  {
    inputRange,
    outputRange,
  }: Readonly<{
    inputRange: readonly Animated.Adaptable<number>[];
    outputRange: readonly Animated.Adaptable<number>[];
  }>
) =>
  inputRange.reduce((acc, lowerBound, index) => {
    const isLast = index === inputRange.length - 1;
    const upperBound = isLast ? lowerBound : inputRange[index + 1];
    return cond(
      and(greaterOrEq(value, lowerBound), lessOrEq(value, upperBound)),
      lerp(
        outputRange[index],
        outputRange[isLast ? index : index + 1],
        divide(sub(value, lowerBound), sub(upperBound, lowerBound))
      ),
      acc
    );
  });
