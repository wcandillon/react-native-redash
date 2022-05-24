/* eslint-disable prefer-destructuring */
import type { Vector } from "./Vectors";

export type Vec3 = readonly [number, number, number];

export type Matrix3 = readonly [Vec3, Vec3, Vec3];

export interface TransformProp {
  transform: Transforms2d;
}

type Transformations = {
  translateX: number;
  translateY: number;
  scale: number;
  skewX: string;
  skewY: string;
  scaleX: number;
  scaleY: number;
  rotateZ: string;
  rotate: string;
};

export type Transforms2d = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "skewX">
  | Pick<Transformations, "skewY">
  | Pick<Transformations, "rotate">
  | Pick<Transformations, "rotateZ">
)[];

export const parseAngle = (angle: string) => {
  "worklet";
  if (angle.endsWith("deg")) {
    return parseFloat(angle) * (Math.PI / 180);
  }
  return parseFloat(angle);
};

export const isTranslateX = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "translateX"> => {
  "worklet";
  return Object.keys(transform).indexOf("translateX") !== -1;
};

export const isTranslateY = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "translateY"> => {
  "worklet";
  return Object.keys(transform).indexOf("translateY") !== -1;
};

export const isScale = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "scale"> => {
  "worklet";
  return Object.keys(transform).indexOf("scale") !== -1;
};

export const isScaleX = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "scaleX"> => {
  "worklet";
  return Object.keys(transform).indexOf("scaleX") !== -1;
};

export const isScaleY = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "scaleY"> => {
  "worklet";
  return Object.keys(transform).indexOf("scaleY") !== -1;
};

export const isSkewX = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "skewX"> => {
  "worklet";
  return Object.keys(transform).indexOf("skewX") !== -1;
};

export const isSkewY = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "skewY"> => {
  "worklet";
  return Object.keys(transform).indexOf("skewY") !== -1;
};

export const isRotate = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "rotate"> => {
  "worklet";
  return Object.keys(transform).indexOf("rotate") !== -1;
};

export const isRotateZ = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "rotateZ"> => {
  "worklet";
  return Object.keys(transform).indexOf("rotateZ") !== -1;
};

const exhaustiveCheck = (a: never): never => {
  "worklet";
  throw new Error(`Unexhaustive handling for ${a}`);
};

const identityMatrix: Matrix3 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const translateXMatrix = (x: number): Matrix3 => {
  "worklet";
  return [
    [1, 0, x],
    [0, 1, 0],
    [0, 0, 1],
  ];
};

const translateYMatrix = (y: number): Matrix3 => {
  "worklet";
  return [
    [1, 0, 0],
    [0, 1, y],
    [0, 0, 1],
  ];
};

const scaleMatrix = (s: number): Matrix3 => {
  "worklet";
  return [
    [s, 0, 0],
    [0, s, 0],
    [0, 0, 1],
  ];
};

const scaleXMatrix = (s: number): Matrix3 => {
  "worklet";
  return [
    [s, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
};

const scaleYMatrix = (s: number): Matrix3 => {
  "worklet";
  return [
    [1, 0, 0],
    [0, s, 0],
    [0, 0, 1],
  ];
};

const skewXMatrix = (s: number): Matrix3 => {
  "worklet";
  return [
    [1, Math.tan(s), 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
};

const skewYMatrix = (s: number): Matrix3 => {
  "worklet";
  return [
    [1, 0, 0],
    [Math.tan(s), 1, 0],
    [0, 0, 1],
  ];
};

const rotateZMatrix = (r: number): Matrix3 => {
  "worklet";
  return [
    [Math.cos(r), -1 * Math.sin(r), 0],
    [Math.sin(r), Math.cos(r), 0],
    [0, 0, 1],
  ];
};

export const dot3 = (row: Vec3, col: Vec3) => {
  "worklet";
  return row[0] * col[0] + row[1] * col[1] + row[2] * col[2];
};

export const matrixVecMul3 = (m: Matrix3, v: Vec3) => {
  "worklet";
  return [dot3(m[0], v), dot3(m[1], v), dot3(m[2], v)] as const;
};

export const multiply3 = (m1: Matrix3, m2: Matrix3) => {
  "worklet";
  const col0 = [m2[0][0], m2[1][0], m2[2][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2]] as const;
  return [
    [dot3(m1[0], col0), dot3(m1[0], col1), dot3(m1[0], col2)],
    [dot3(m1[1], col0), dot3(m1[1], col1), dot3(m1[1], col2)],
    [dot3(m1[2], col0), dot3(m1[2], col1), dot3(m1[2], col2)],
  ] as const;
};

const serializeToSVGMatrix = (m: Matrix3) => {
  "worklet";
  return `matrix(${m[0][0]}, ${m[1][0]}, ${m[0][1]}, ${m[1][1]}, ${m[0][2]}, ${m[1][2]})`;
};

export const svgMatrix = (transforms: Transforms2d) => {
  "worklet";
  return serializeToSVGMatrix(processTransform2d(transforms));
};

export const processTransform2d = (transforms: Transforms2d) => {
  "worklet";
  return transforms.reduce((acc, transform) => {
    if (isTranslateX(transform)) {
      return multiply3(acc, translateXMatrix(transform.translateX));
    }
    if (isTranslateY(transform)) {
      return multiply3(acc, translateYMatrix(transform.translateY));
    }
    if (isScale(transform)) {
      return multiply3(acc, scaleMatrix(transform.scale));
    }
    if (isScaleX(transform)) {
      return multiply3(acc, scaleXMatrix(transform.scaleX));
    }
    if (isScaleY(transform)) {
      return multiply3(acc, scaleYMatrix(transform.scaleY));
    }
    if (isSkewX(transform)) {
      return multiply3(acc, skewXMatrix(parseAngle(transform.skewX)));
    }
    if (isSkewY(transform)) {
      return multiply3(acc, skewYMatrix(parseAngle(transform.skewY)));
    }
    if (isRotate(transform)) {
      return multiply3(acc, rotateZMatrix(parseAngle(transform.rotate)));
    }
    if (isRotateZ(transform)) {
      return multiply3(acc, rotateZMatrix(parseAngle(transform.rotateZ)));
    }
    return exhaustiveCheck(transform);
  }, identityMatrix);
};

const isMatrix3 = (arg: Matrix3 | Transforms2d): arg is Matrix3 => {
  "worklet";
  return arg.length === 3 && arg[0] instanceof Array;
};

// https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
export const decompose2d = (arg: Matrix3 | Transforms2d) => {
  "worklet";
  const m = isMatrix3(arg) ? arg : processTransform2d(arg);
  const a = m[0][0];
  const b = m[1][0];
  const c = m[0][1];
  const d = m[1][1];
  const translateX = m[0][2];
  const translateY = m[1][2];
  const E = (a + d) / 2;
  const F = (a - d) / 2;
  const G = (c + b) / 2;
  const H = (c - b) / 2;
  const Q = Math.sqrt(Math.pow(E, 2) + Math.pow(H, 2));
  const R = Math.sqrt(Math.pow(F, 2) + Math.pow(G, 2));
  const scaleX = Q + R;
  const scaleY = Q - R;
  const a1 = Math.atan2(G, F);
  const a2 = Math.atan2(H, E);
  const theta = (a2 - a1) / 2;
  const phi = (a2 + a1) / 2;
  return [
    { translateX },
    { translateY },
    { rotateZ: -1 * theta },
    { scaleX },
    { scaleY },
    { rotateZ: -1 * phi },
  ] as const;
};

const adjugate = (m: Matrix3) => {
  "worklet";
  return [
    [
      m[1][1] * m[2][2] - m[1][2] * [2][1],
      m[0][2] * [2][1] - m[0][1] * [2][2],
      m[0][1] * [1][2] - m[0][2] * [1][1],
    ],
    [
      m[1][2] * [2][0] - m[1][0] * [2][2],
      m[0][0] * [2][2] - m[0][2] * [2][0],
      m[0][2] * [1][0] - m[0][0] * [1][2],
    ],
    [
      m[1][0] * [2][1] - m[1][1] * [2][0],
      m[0][1] * [2][0] - m[0][0] * [2][1],
      m[0][0] * [1][1] - m[0][1] * [1][0],
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
  "worklet";
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
  "worklet";
  const s = basisToPoints(params.canvas);
  const d = basisToPoints(params.projected);
  const t = multiply3(d, adjugate(s));
  return [
    [t[0][0] / t[2][2], t[0][1] / t[2][2], t[0][2] / t[2][2]],
    [t[1][0] / t[2][2], t[1][1] / t[2][2], t[1][2] / t[2][2]],
    [t[2][0] / t[2][2], t[2][1] / t[2][2], 1],
  ] as const;
};
