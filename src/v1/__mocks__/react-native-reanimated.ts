import { Platform } from "react-native";
import Animated from "react-native-reanimated";

enum Extrapolate {
  EXTEND = "extend",
  CLAMP = "clamp",
  IDENTITY = "identity",
}

interface InterpolationConfig {
  inputRange: ReadonlyArray<Animated.Adaptable<number>>;
  outputRange: ReadonlyArray<Animated.Adaptable<number>>;
  extrapolate?: Extrapolate;
  extrapolateLeft?: Extrapolate;
  extrapolateRight?: Extrapolate;
}

const getValue = (node) => {
  if (typeof node === "number") {
    return node;
  }
  if (node instanceof Array) {
    return getValue(node[node.length - 1]);
  }
  return node[" __value"];
};

class AnimatedValue {
  " __value": number;

  constructor(val: number) {
    this[" __value"] = val;
  }

  setValue(val: number) {
    this[" __value"] = val;
  }
}
const Reanimated = {
  Value: AnimatedValue,
  Node: AnimatedValue,
  block: (arr) => arr[arr.length - 1],
  proc: (cb) => cb,
  add: (...vals) =>
    new AnimatedValue(vals.map((v) => getValue(v)).reduce((acc, v) => acc + v)),
  sub: (...vals) =>
    new AnimatedValue(vals.map((v) => getValue(v)).reduce((acc, v) => acc - v)),
  divide: (...vals) =>
    new AnimatedValue(vals.map((v) => getValue(v)).reduce((acc, v) => acc / v)),
  multiply: (...vals) =>
    new AnimatedValue(vals.map((v) => getValue(v)).reduce((acc, v) => acc * v)),
  sin: (a) => new AnimatedValue(Math.sin(getValue(a))),
  tan: (a) => new AnimatedValue(Math.tan(getValue(a))),
  cos: (a) => new AnimatedValue(Math.cos(getValue(a))),
  sqrt: (a) => new AnimatedValue(Math.sqrt(getValue(a))),
  min: (...a) => new AnimatedValue(Math.min(...a.map((b) => getValue(b)))),
  max: (...a) => new AnimatedValue(Math.max(...a.map((b) => getValue(b)))),
  pow: (...a) =>
    new AnimatedValue(
      a.reduce((b, c, index) => (index > 0 ? getValue(b) ** getValue(c) : c), 0)
    ),
  and: (a, b) => new AnimatedValue(getValue(a) && getValue(b)),
  set: (a, b) => {
    a.setValue(getValue(b));
    return a;
  },
  or: (a, b) => new AnimatedValue(getValue(a) || getValue(b)),
  modulo: (a, b) => new AnimatedValue(getValue(a) % getValue(b)),
  exp: (a) => new AnimatedValue(Math.exp(getValue(a))),
  asin: (a) => new AnimatedValue(Math.asin(getValue(a))),
  atan: (a) => new AnimatedValue(Math.atan(getValue(a))),
  acos: (a) => new AnimatedValue(Math.acos(getValue(a))),
  floor: (a) => new AnimatedValue(Math.floor(getValue(a))),
  abs: (a) => new AnimatedValue(Math.abs(getValue(a))),
  round: (a) => new AnimatedValue(Math.round(getValue(a))),
  ceil: (a) => new AnimatedValue(Math.ceil(getValue(a))),
  concat: (a, b) => getValue(a) + b,
  eq: (a, b) => new AnimatedValue(Number(getValue(a) === getValue(b))),
  neq: (a, b) => new AnimatedValue(Number(getValue(a) !== getValue(b))),
  lessThan: (a, b) => new AnimatedValue(Number(getValue(a) < getValue(b))),
  greaterThan: (a, b) => new AnimatedValue(Number(getValue(a) > getValue(b))),
  greaterOrEq: (a, b) => new AnimatedValue(Number(getValue(a) >= getValue(b))),
  lessOrEq: (a, b) => new AnimatedValue(Number(getValue(a) <= getValue(b))),
  not: (a) => new AnimatedValue(Number(!getValue(a))),
  cond: (a, b, c) => new AnimatedValue(getValue(a) ? getValue(b) : getValue(c)),
  color: (r, g, b, a = 1) => {
    const color =
      16777216 * Math.round(getValue(a) * 255) +
      65536 * getValue(r) +
      256 * getValue(g) +
      getValue(b);
    if (Platform.OS === "android") {
      // on Android color is represented as signed 32 bit int
      if (color < (1 << 31) >>> 0) {
        return new AnimatedValue(color);
      }
      return new AnimatedValue(color - 2 ** 32);
    }
    return new AnimatedValue(color);
  },
  interpolate: (
    v: Animated.Value<number>,
    { inputRange, outputRange }: InterpolationConfig
  ) => {
    const [inS, inE] = [getValue(inputRange[0]), getValue(inputRange[1])];
    const [outS, outE] = [getValue(outputRange[0]), getValue(outputRange[1])];
    const value = getValue(v);
    const progress = (value - inS) / (inE - inS);
    // logic below was made in order to provide a compatibility witn an Animated API
    const resultForNonZeroRange = outS + progress * (outE - outS);
    if (inS === inE) {
      if (value <= inS) {
        return outS;
      }
      return outE;
    }
    return resultForNonZeroRange;
  },
  Extrapolate,
};

export default Reanimated;
