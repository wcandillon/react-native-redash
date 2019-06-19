import Animated from "react-native-reanimated";

const {
  Value,
  block,
  set,
  sqrt,
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
  pow
} = Animated;

export const min = (...args: Animated.Adaptable<number>[]) =>
  args.reduce((acc, arg) => min2(acc, arg));

export const max = (...args: Animated.Adaptable<number>[]) =>
  args.reduce((acc, arg) => max2(acc, arg));

export const clamp = (
  value: Animated.Node<number>,
  lowerBound: number,
  upperBound: number
): Animated.Node<number> => min2(max2(lowerBound, value), upperBound);

export const toRad = (deg: Animated.Adaptable<number>): Animated.Node<number> =>
  multiply(deg, Math.PI / 180);

export const toDeg = (rad: Animated.Adaptable<number>): Animated.Node<number> =>
  multiply(rad, 180 / Math.PI);

export const atan = (rad: Animated.Adaptable<number>): Animated.Node<number> =>
  sub(
    multiply(Math.PI / 4, rad),
    multiply(
      multiply(rad, sub(abs(rad), 1)),
      add(0.2447, multiply(0.0663, abs(rad)))
    )
  );

export const atan2 = (
  y: Animated.Adaptable<number>,
  x: Animated.Adaptable<number>
): Animated.Node<number> => {
  const coeff1 = Math.PI / 4;
  const coeff2 = 3 * coeff1;
  const absY = abs(y);
  const angle = cond(
    greaterOrEq(x, 0),
    [sub(coeff1, multiply(coeff1, divide(sub(x, absY), add(x, absY))))],
    [sub(coeff2, multiply(coeff1, divide(add(x, absY), sub(absY, x))))]
  );
  return cond(lessThan(y, 0), multiply(angle, -1), angle);
};

// https://developer.download.nvidia.com/cg/acos.html
export const acos = (x1: Animated.Adaptable<number>) => {
  const negate: Animated.Value<number> = new Value();
  const x: Animated.Value<number> = new Value();
  const ret: Animated.Value<number> = new Value();
  return block([
    set(negate, lessThan(x, 0)),
    set(x, abs(x1)),
    set(ret, -0.0187293),
    set(ret, multiply(ret, x)),
    set(ret, add(ret, 0.074261)),
    set(ret, multiply(ret, x)),
    set(ret, sub(ret, 0.2121144)),
    set(ret, multiply(ret, x)),
    set(ret, add(ret, 1.5707288)),
    set(ret, sqrt(sub(1, x))),
    set(ret, sub(ret, multiply(2, negate, ret))),
    add(multiply(negate, Math.PI), ret)
  ]);
};

export const cubicBezier = (
  t: Animated.Node<number>,
  p0: Animated.Node<number>,
  p1: Animated.Node<number>,
  p2: Animated.Node<number>,
  p3: Animated.Node<number>
): Animated.Node<number> => {
  const term = sub(1, t);
  const a = multiply(1, pow(term, 3), pow(t, 0), p0);
  const b = multiply(3, pow(term, 2), pow(t, 1), p1);
  const c = multiply(3, pow(term, 1), pow(t, 2), p2);
  const d = multiply(1, pow(term, 0), pow(t, 3), p3);
  return add(a, b, c, d);
};
