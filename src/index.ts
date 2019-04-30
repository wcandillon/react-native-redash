import Animated from "react-native-reanimated";

const {
  event,
  spring,
  cond,
  set,
  clockRunning,
  startClock,
  stopClock,
  Value,
  add,
  multiply,
  lessThan,
  abs,
  modulo,
  round,
  interpolate,
  divide,
  sub,
  color,
  eq,
  Extrapolate,
  block,
  debug,
  min: min2,
  max: max2,
  timing,
  Clock,
  greaterOrEq,
  Node,
} = Animated;

export { timing, clockRunning, add };

export type TimingConfig = Parameters<typeof timing>[1];
export type Clock = Parameters<typeof clockRunning>[0];
export type Node = ReturnType<typeof add>;
export type Adaptable<T> = Node | T;

// ## Math
export const toRad = (deg: Adaptable<number>) => multiply(deg, Math.PI / 180);
export const toDeg = (rad: Adaptable<number>) => multiply(rad, 180 / Math.PI);

export const min = (...args: Adaptable<number>[]) => args.reduce((acc, arg) => min2(acc, arg));
export const max = (...args: Adaptable<number>[]) => args.reduce((acc, arg) => max2(acc, arg));

export const atan = (rad: Adaptable<number>) => sub(
  multiply(Math.PI / 4, rad),
  multiply(multiply(rad, sub(abs(rad), 1)), add(0.2447, multiply(0.0663, abs(rad)))),
);
export const atan2 = (y: Adaptable<number>, x: Adaptable<number>) => {
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

// ## Animations
export const getSnapPoint = (value: Adaptable<number>, velocity: Adaptable<number>, points: number[]) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map(p => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce((acc: Node, p: number) => cond(eq(diffPoint(p), minDelta), p, acc), new Value());
};

export const lookup = (
  array: Adaptable<number>[],
  index: Adaptable<number>,
  notFound: Node = new Value(),
) => array.reduce((acc, v, i) => cond(eq(i, index), v, acc), notFound);

export function runSpring(clock: Clock, value: Adaptable<number>, dest: Adaptable<number>) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

export function runTiming(clock: Clock, value: Adaptable<any>, config: TimingConfig) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

function match(condsAndResPairs: Adaptable<number>[], offset = 0): any {
  if (condsAndResPairs.length - offset === 1) {
    return condsAndResPairs[offset];
  } if (condsAndResPairs.length - offset === 0) {
    return undefined;
  }
  return cond(
    condsAndResPairs[offset],
    condsAndResPairs[offset + 1],
    match(condsAndResPairs, offset + 2),
  );
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

function colorHSV(
  h: Adaptable<number> /* 0 - 360 */,
  s: Adaptable<number> /* 0 - 1 */,
  v: Adaptable<number>, /* 0 - 1 */
) {
  // Converts color from HSV format into RGB
  // Formula explained here: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
  const c = multiply(v, s);
  const hh = divide(h, 60);
  const x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1))));

  const m = sub(v, c);

  const colorRGB = (r: Adaptable<number>, g: Adaptable<number>, b: Adaptable<number>) => color(
    round(multiply(255, add(r, m))),
    round(multiply(255, add(g, m))),
    round(multiply(255, add(b, m))),
  );

  return match([
    lessThan(h, 60),
    colorRGB(c, x, 0),
    lessThan(h, 120),
    colorRGB(x, c, 0),
    lessThan(h, 180),
    colorRGB(0, c, x),
    lessThan(h, 240),
    colorRGB(0, x, c),
    lessThan(h, 300),
    colorRGB(x, 0, c),
    colorRGB(c, 0, x) /* else */,
  ]);
}

const rgb2hsv = ({ r, g, b }: RGBColor) => {
  const v = Math.max(r, g, b); const
    n = v - Math.min(r, g, b);
  // eslint-disable-next-line no-nested-ternary
  const h = n && ((v === r) ? (g - b) / n : ((v === g) ? 2 + (b - r) / n : 4 + (r - g) / n));
  return { h: 60 * (h < 0 ? h + 6 : h), s: v && n / v, v };
};

export const interpolateColors = (animationValue: Adaptable<number>, inputRange: number[], colors: RGBColor[]) => {
  const colorsAsHSV = colors
    .map(c => rgb2hsv(c))
    .map(c => ({ h: c.h, s: c.s / 100, v: c.v / 100 }));
  const h = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.h),
    extrapolate: Extrapolate.CLAMP,
  });
  const s = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.s),
    extrapolate: Extrapolate.CLAMP,
  });
  const v = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.v),
    extrapolate: Extrapolate.CLAMP,
  });
  return colorHSV(h, s, v);
};

// ## Transformations
export const translateZ = (perspective: Adaptable<number>, z: Adaptable<number>) => (
  { scale: divide(perspective, sub(perspective, z)) }
);

// ## Gestures
export const onScroll = (contentOffset: { x?: Node, y?: Node }) => event(
  [
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ],
  { useNativeDriver: true },
);
