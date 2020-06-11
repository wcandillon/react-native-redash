import Animated from "react-native-reanimated";
import { atan2 } from "./Math";
import { Vector } from "./Vectors";

const { add, multiply, sqrt, cos, sin, sub, divide, pow, tan } = Animated;

export type Vec3 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

export type Matrix3 = readonly [Vec3, Vec3, Vec3];

type Transform2dName =
  | "translateX"
  | "translateY"
  | "scale"
  | "skewX"
  | "skewY"
  | "scaleX"
  | "scaleY"
  | "rotateZ"
  | "rotate";
type Transformations = {
  [Name in Transform2dName]: Animated.Adaptable<number>;
};
export type Transforms2d = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "skewX">
  | Pick<Transformations, "skewY">
  | Pick<Transformations, "rotateZ">
  | Pick<Transformations, "rotate">
)[];

const exhaustiveCheck = (a: never): never => {
  throw new Error(`Unexhaustive handling for ${a}`);
};

const identityMatrix: Matrix3 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const translateXMatrix = (x: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, x],
  [0, 1, 0],
  [0, 0, 1],
];

const translateYMatrix = (y: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, 0],
  [0, 1, y],
  [0, 0, 1],
];

const scaleMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [s, 0, 0],
  [0, s, 0],
  [0, 0, 1],
];

const scaleXMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [s, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const scaleYMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, 0],
  [0, s, 0],
  [0, 0, 1],
];

const skewXMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [1, tan(s), 0],
  [0, 1, 0],
  [0, 0, 1],
];

const skewYMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, 0],
  [tan(s), 1, 0],
  [0, 0, 1],
];

const rotateZMatrix = (r: Animated.Adaptable<number>): Matrix3 => [
  [cos(r), multiply(-1, sin(r)), 0],
  [sin(r), cos(r), 0],
  [0, 0, 1],
];

export const dot3 = (row: Vec3, col: Vec3) =>
  add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2])
  );

export const matrixVecMul3 = (m: Matrix3, v: Vec3) =>
  [dot3(m[0], v), dot3(m[1], v), dot3(m[2], v)] as const;

export const multiply3 = (m1: Matrix3, m2: Matrix3) => {
  const col0 = [m2[0][0], m2[1][0], m2[2][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2]] as const;
  return [
    [dot3(m1[0], col0), dot3(m1[0], col1), dot3(m1[0], col2)],
    [dot3(m1[1], col0), dot3(m1[1], col1), dot3(m1[1], col2)],
    [dot3(m1[2], col0), dot3(m1[2], col1), dot3(m1[2], col2)],
  ] as const;
};

export const processTransform2d = (transforms: Transforms2d) =>
  transforms.reduce((acc, transform) => {
    const key = Object.keys(transform)[0] as Transform2dName;
    const value = (transform as Pick<Transformations, typeof key>)[key];
    if (key === "translateX") {
      return multiply3(acc, translateXMatrix(value));
    }
    if (key === "translateY") {
      return multiply3(acc, translateYMatrix(value));
    }
    if (key === "scale") {
      return multiply3(acc, scaleMatrix(value));
    }
    if (key === "scaleX") {
      return multiply3(acc, scaleXMatrix(value));
    }
    if (key === "scaleY") {
      return multiply3(acc, scaleYMatrix(value));
    }
    if (key === "skewX") {
      return multiply3(acc, skewXMatrix(value));
    }
    if (key === "skewY") {
      return multiply3(acc, skewYMatrix(value));
    }
    if (key === "rotate" || key === "rotateZ") {
      return multiply3(acc, rotateZMatrix(value));
    }
    return exhaustiveCheck(key);
  }, identityMatrix);

const isMatrix3 = (arg: Matrix3 | Transforms2d): arg is Matrix3 =>
  arg.length === 3 && arg[0] instanceof Array;

// https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
export const decompose2d = (arg: Matrix3 | Transforms2d) => {
  const m = isMatrix3(arg) ? arg : processTransform2d(arg);
  const a = m[0][0];
  const b = m[1][0];
  const c = m[0][1];
  const d = m[1][1];
  const translateX = m[0][2] as Animated.Node<number>;
  const translateY = m[1][2] as Animated.Node<number>;
  const E = divide(add(a, d), 2);
  const F = divide(sub(a, d), 2);
  const G = divide(add(c, b), 2);
  const H = divide(sub(c, b), 2);
  const Q = sqrt(add(pow(E, 2), pow(H, 2)));
  const R = sqrt(add(pow(F, 2), pow(G, 2)));
  const scaleX = add(Q, R);
  const scaleY = sub(Q, R);
  const a1 = atan2(G, F);
  const a2 = atan2(H, E);
  const theta = divide(sub(a2, a1), 2);
  const phi = divide(add(a2, a1), 2);
  return [
    { translateX },
    { translateY },
    { rotateZ: multiply(-1, theta) },
    { scaleX },
    { scaleY },
    { rotateZ: multiply(-1, phi) },
  ] as const;
};

const adjugate = (m: Matrix3) => {
  return [
    [
      sub(multiply(m[1][1], m[2][2]), multiply(m[1][2], m[2][1])),
      sub(multiply(m[0][2], m[2][1]), multiply(m[0][1], m[2][2])),
      sub(multiply(m[0][1], m[1][2]), multiply(m[0][2], m[1][1])),
    ],
    [
      sub(multiply(m[1][2], m[2][0]), multiply(m[1][0], m[2][2])),
      sub(multiply(m[0][0], m[2][2]), multiply(m[0][2], m[2][0])),
      sub(multiply(m[0][2], m[1][0]), multiply(m[0][0], m[1][2])),
    ],
    [
      sub(multiply(m[1][0], m[2][1]), multiply(m[1][1], m[2][0])),
      sub(multiply(m[0][1], m[2][0]), multiply(m[0][0], m[2][1])),
      sub(multiply(m[0][0], m[1][1]), multiply(m[0][1], m[1][0])),
    ],
  ] as const;
};

interface Quadrilateral {
  p1: Vector;
  p2: Vector;
  p3: Vector;
  p4: Vector;
}

interface Parameters {
  canvas: Quadrilateral;
  projected: Quadrilateral;
}

const basisToPoints = ({ p1, p2, p3, p4 }: Quadrilateral) => {
  const m = [
    [p1.x, p2.x, p3.x],
    [p1.y, p2.y, p3.y],
    [1, 1, 1],
  ] as const;
  const v = matrixVecMul3(adjugate(m), [p4.x, p4.y, 1]);
  return multiply3(m, [
    [v[0], 0, 0],
    [0, v[1], 0],
    [0, 0, v[2]],
  ]);
};

// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
// https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
// http://jsfiddle.net/dFrHS/1/
export const transform2d = (params: Parameters) => {
  const s = basisToPoints(params.canvas);
  const d = basisToPoints(params.projected);
  const t = multiply3(d, adjugate(s));
  return [
    [
      divide(t[0][0], t[2][2]),
      divide(t[0][1], t[2][2]),
      divide(t[0][2], t[2][2]),
    ],
    [
      divide(t[1][0], t[2][2]),
      divide(t[1][1], t[2][2]),
      divide(t[1][2], t[2][2]),
    ],
    [divide(t[2][0], t[2][2]), divide(t[2][1], t[2][2]), 1],
  ] as const;
};
