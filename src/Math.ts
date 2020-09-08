export const bin = (value: boolean): 0 | 1 => {
  "worklet";
  return value ? 1 : 0;
};

export const mix = (value: number, x: number, y: number) => {
  "worklet";
  return x + value * (y - x);
};

export const lerp = (x: number, y: number, value: number) => {
  "worklet";
  return (1 - value) * x + value * y;
};

export const toDeg = (rad: number) => {
  "worklet";
  return (rad * 180) / Math.PI;
};

export const toRad = (deg: number) => {
  "worklet";
  return (deg * Math.PI) / 180;
};

export const between = (
  value: number,
  lowerBound: number,
  upperBound: number,
  inclusive = true
) => {
  if (inclusive) {
    return value >= lowerBound && value <= upperBound;
  }
  return value > lowerBound && value < upperBound;
};

export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number
) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export const cubicBezier = (
  t: number,
  from: number,
  c1: number,
  c2: number,
  to: number
) => {
  "worklet";
  const term = 1 - t;
  const a = 1 * term ** 3 * t ** 0 * from;
  const b = 3 * term ** 2 * t ** 1 * c1;
  const c = 3 * term ** 1 * t ** 2 * c2;
  const d = 1 * term ** 0 * t ** 3 * to;
  return a + b + c + d;
};

export const round = (value: number, precision = 0) => {
  "worklet";
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
};
