import Animated from "react-native-reanimated";

const {
  eq,
  set,
  cond,
  atan,
  add,
  multiply,
  lessThan,
  abs,
  divide,
  sub,
  min: min2,
  max: max2,
  round: reRound,
  greaterThan,
  pow,
  and,
  greaterOrEq,
  lessOrEq,
  proc,
  floor,
} = Animated;

export const bin = (value: boolean): 0 | 1 => (value ? 1 : 0);

export const fract = (x: Animated.Adaptable<number>) => sub(x, floor(x));

export const sign = (x: Animated.Adaptable<number>) =>
  cond(lessThan(x, 0), -1, cond(eq(x, 0), 0, 1));

export const min = (...args: Animated.Adaptable<number>[]) =>
  args.reduce((acc, arg) => min2(acc, arg));

export const max = (...args: Animated.Adaptable<number>[]) =>
  args.reduce((acc, arg) => max2(acc, arg));

export const minus = (x: Animated.Node<number>) => multiply(-1, x);

export const avg = (
  ...v: [
    Animated.Adaptable<number>,
    Animated.Adaptable<number>,
    ...Animated.Adaptable<number>[]
  ]
) => divide(add(...v), v.length);

export const clamp = proc(
  (
    value: Animated.Adaptable<number>,
    lowerBound: Animated.Adaptable<number>,
    upperBound: Animated.Adaptable<number>
  ): Animated.Node<number> => min2(max2(lowerBound, value), upperBound)
);

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

export const approximates = proc(
  (
    a: Animated.Adaptable<number>,
    b: Animated.Adaptable<number>,
    precision: Animated.Adaptable<number> = 0.001
  ) => lessThan(abs(sub(a, b)), precision)
);

export const toRad = proc(
  (deg: Animated.Adaptable<number>): Animated.Node<number> =>
    multiply(deg, Math.PI / 180)
);

export const toDeg = proc(
  (rad: Animated.Adaptable<number>): Animated.Node<number> =>
    multiply(rad, 180 / Math.PI)
);

// https://en.wikipedia.org/wiki/Atan2
// https://www.gamedev.net/forums/topic/441464-manually-implementing-atan2-or-atan/
// https://developer.download.nvidia.com/cg/atan2.html
// https://www.medcalc.org/manual/atan2_function.php
export const atan2 = proc(
  (y: Animated.Adaptable<number>, x: Animated.Adaptable<number>) => {
    const a = atan(divide(y, x));
    const { PI } = Math;
    return cond(
      greaterThan(x, 0),
      a,
      cond(
        and(lessThan(x, 0), greaterOrEq(y, 0)),
        add(a, PI),
        cond(
          and(lessThan(x, 0), lessThan(y, 0)),
          sub(a, PI),
          cond(
            and(eq(x, 0), greaterThan(y, 0)),
            PI / 2,
            cond(and(eq(x, 0), lessThan(y, 0)), -PI / 2, 0)
          )
        )
      )
    );
  }
);

export const cubicBezier = proc(
  (
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
  }
);

export const round = proc(
  (
    value: Animated.Adaptable<number>,
    precision: Animated.Adaptable<number> = 0
  ) => {
    const p = pow(10, precision);
    return divide(reRound(multiply(value, p)), p);
  }
);

export const inc = proc((value: Animated.Value<number>) =>
  set(value, add(value, 1))
);

export const dec = proc((value: Animated.Value<number>) =>
  set(value, sub(value, 1))
);
