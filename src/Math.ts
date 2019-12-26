import Animated from "react-native-reanimated";

const {
  Value,
  block,
  set,
  cond,
  add,
  multiply,
  lessThan,
  abs,
  divide,
  sub,
  min: min2,
  max: max2,
  greaterThan,
  pow,
  and,
  greaterOrEq,
  lessOrEq,
  proc
} = Animated;

export const bin = (value: boolean): 0 | 1 => (value ? 1 : 0);

export const inc = (value: Animated.Value<number>) => set(value, add(value, 1));

export const dec = (value: Animated.Value<number>) => set(value, sub(value, 1));

export const min = (...args: Animated.Adaptable<number>[]) =>
  args.reduce((acc, arg) => min2(acc, arg));

export const max = (...args: Animated.Adaptable<number>[]) =>
  args.reduce((acc, arg) => max2(acc, arg));

export const clamp = (
  value: Animated.Adaptable<number>,
  lowerBound: Animated.Adaptable<number>,
  upperBound: Animated.Adaptable<number>
): Animated.Node<number> => min2(max2(lowerBound, value), upperBound);

export const between = (
  value: Animated.Node<number>,
  lowerBound: Animated.Adaptable<number>,
  upperBound: Animated.Adaptable<number>,
  inclusive = true
) => {
  if (inclusive) {
    return and(greaterOrEq(value, lowerBound), lessOrEq(value, upperBound));
  }
  return and(greaterThan(value, lowerBound), lessThan(value, upperBound));
};

export const approximates = (
  a: Animated.Adaptable<number>,
  b: Animated.Adaptable<number>,
  precision: Animated.Adaptable<number> = 0.001
) => lessThan(abs(sub(a, b)), precision);

export const toRad = (deg: Animated.Adaptable<number>): Animated.Node<number> =>
  multiply(deg, Math.PI / 180);

export const toDeg = (rad: Animated.Adaptable<number>): Animated.Node<number> =>
  multiply(rad, 180 / Math.PI);

// https://developer.download.nvidia.com/cg/atan2.html
const atan2Proc = proc(
  (
    x: Animated.Adaptable<number>,
    y: Animated.Adaptable<number>,
    t0: Animated.Value<number>,
    t1: Animated.Value<number>,
    t3: Animated.Value<number>,
    t4: Animated.Value<number>
  ) =>
    block([
      set(t3, abs(x)),
      set(t1, abs(y)),
      set(t0, max(t3, t1)),
      set(t1, min(t3, t1)),
      set(t3, divide(1, t0)),
      set(t3, multiply(t1, t3)),
      set(t4, multiply(t3, t3)),
      set(t0, -0.01348047),
      set(t0, add(multiply(t0, t4), 0.057477314)),
      set(t0, sub(multiply(t0, t4), 0.121239071)),
      set(t0, add(multiply(t0, t4), 0.195635925)),
      set(t0, sub(multiply(t0, t4), 0.332994597)),
      set(t0, add(multiply(t0, t4), 0.99999563)),
      set(t3, multiply(t0, t3)),
      set(t3, cond(greaterThan(abs(y), abs(x)), sub(1.570796327, t3), t3)),
      set(t3, cond(lessThan(x, 0), sub(Math.PI, t3), t3)),
      set(t3, cond(lessThan(y, 0), multiply(t3, -1), t3)),
      t3
    ])
);

export const atan2 = (
  y: Animated.Adaptable<number>,
  x: Animated.Adaptable<number>
): Animated.Node<number> => {
  const t0: Animated.Value<number> = new Value();
  const t1: Animated.Value<number> = new Value();
  const t3: Animated.Value<number> = new Value();
  const t4: Animated.Value<number> = new Value();
  return atan2Proc(x, y, t0, t1, t3, t4);
};

export const cubicBezier = (
  t: Animated.Adaptable<number>,
  p0: Animated.Adaptable<number>,
  p1: Animated.Adaptable<number>,
  p2: Animated.Adaptable<number>,
  p3: Animated.Adaptable<number>
): Animated.Node<number> => {
  const term = sub(1, t);
  const a = multiply(1, pow(term, 3), pow(t, 0), p0);
  const b = multiply(3, pow(term, 2), pow(t, 1), p1);
  const c = multiply(3, pow(term, 1), pow(t, 2), p2);
  const d = multiply(1, pow(term, 0), pow(t, 3), p3);
  return add(a, b, c, d);
};
