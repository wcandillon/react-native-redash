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
  cos,
  sin,
  greaterOrEq,
} = Animated;

// ## Math
export const toRad = (deg: Animated.Adaptable<number>) => multiply(deg, Math.PI / 180);
export const toDeg = (rad: Animated.Adaptable<number>) => multiply(rad, 180 / Math.PI);

export const min = (...args: Animated.Adaptable<number>[]) => args.reduce((acc, arg) => min2(acc, arg));
export const max = (...args: Animated.Adaptable<number>[]) => args.reduce((acc, arg) => max2(acc, arg));

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

export const convertCoordinates = (xCenter: Animated.Adaptable<number>, yCenter: Animated.Adaptable<number>) => {
  const x1toX2 = (x1: Animated.Adaptable<number>) => sub(x1, xCenter);
  const x2toX1 = (x2: Animated.Adaptable<number>) => add(x2, xCenter);
  const y1toY2 = (y1: Animated.Adaptable<number>) => add(multiply(y1, -1), yCenter);
  const y2toY1 = (y2: Animated.Adaptable<number>) => add(multiply(y2, -1), yCenter);
  return {
    canvasToCartesian: (
      x: Animated.Adaptable<number>,
      y: Animated.Adaptable<number>,
    ) => [x1toX2(x), y1toY2(y)],
    cartesianToCanvas: (
      x: Animated.Adaptable<number>,
      y: Animated.Adaptable<number>,
    ) => [x2toX1(x), y2toY1(y)],
    polarToCartesian: (
      ϑ: Animated.Adaptable<number>,
      r: Animated.Adaptable<number>,
    ) => [
      multiply(r, cos(ϑ)),
      multiply(r, sin(ϑ)),
    ],
    polarToCanvas: (
      ϑ: Animated.Adaptable<number>,
      r: Animated.Adaptable<number>,
    ) => [
      x2toX1(multiply(r, cos(ϑ))),
      y2toY1(multiply(r, sin(ϑ))),
    ],
  };
};
