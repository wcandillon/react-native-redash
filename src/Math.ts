import Animated from "react-native-reanimated";

const {
  cond,
  add,
  multiply,
  lessThan,
  abs,
  divide,
  sub,
  min: min2,
  max: max2,
  greaterOrEq,
} = Animated;

// ## Math
export const toRad = (deg: Animated.Adaptable<number>) => multiply(deg, Math.PI / 180);
export const toDeg = (rad: Animated.Adaptable<number>) => multiply(rad, 180 / Math.PI);

export const min = (...args: Animated.Adaptable<number>[]) => args.reduce((acc, arg) => min2(acc, arg));
export const max = (...args: Animated.Adaptable<number>[]) => args.reduce((acc, arg) => max2(acc, arg));
export const clamp = (
  value: Animated.Node<number>,
  lowerBound: number,
  upperBound: number,
) => min2(max2(lowerBound, value), upperBound);

export const atan = (rad: Animated.Adaptable<number>) => sub(
  multiply(Math.PI / 4, rad),
  multiply(multiply(rad, sub(abs(rad), 1)), add(0.2447, multiply(0.0663, abs(rad)))),
);

export const atan2 = (y: Animated.Adaptable<number>, x: Animated.Adaptable<number>) => {
  const coeff1 = Math.PI / 4;
  const coeff2 = 3 * coeff1;
  const absY = abs(y);
  const angle = cond(greaterOrEq(x, 0), [
    sub(coeff1, multiply(coeff1, divide(sub(x, absY), add(x, absY)))),
  ], [
    sub(coeff2, multiply(coeff1, divide(add(x, absY), sub(absY, x)))),
  ]);
  return cond(lessThan(y, 0), multiply(angle, -1), angle);
};
