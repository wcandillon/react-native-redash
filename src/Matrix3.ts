/* eslint-disable prefer-destructuring */
export type Vec2 = readonly [number, number];
type Vec3 = readonly [number, number, number];

export type Matrix3 = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

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

/**
 * @worklet
 */
export const parseAngle = (angle: string) => {
  "worklet";
  if (angle.endsWith("deg")) {
    return parseFloat(angle) * (Math.PI / 180);
  }
  return parseFloat(angle);
};

/**
 * @worklet
 */
export const isTranslateX = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "translateX"> => {
  "worklet";
  return Object.keys(transform).indexOf("translateX") !== -1;
};

/**
 * @worklet
 */
export const isTranslateY = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "translateY"> => {
  "worklet";
  return Object.keys(transform).indexOf("translateY") !== -1;
};

/**
 * @worklet
 */
export const isScale = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "scale"> => {
  "worklet";
  return Object.keys(transform).indexOf("scale") !== -1;
};

/**
 * @worklet
 */
export const isScaleX = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "scaleX"> => {
  "worklet";
  return Object.keys(transform).indexOf("scaleX") !== -1;
};

/**
 * @worklet
 */
export const isScaleY = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "scaleY"> => {
  "worklet";
  return Object.keys(transform).indexOf("scaleY") !== -1;
};

/**
 * @worklet
 */
export const isSkewX = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "skewX"> => {
  "worklet";
  return Object.keys(transform).indexOf("skewX") !== -1;
};

/**
 * @worklet
 */
export const isSkewY = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "skewY"> => {
  "worklet";
  return Object.keys(transform).indexOf("skewY") !== -1;
};

/**
 * @worklet
 */
export const isRotate = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "rotate"> => {
  "worklet";
  return Object.keys(transform).indexOf("rotate") !== -1;
};

/**
 * @worklet
 */
export const isRotateZ = (
  transform: Transforms2d[0]
): transform is Pick<Transformations, "rotateZ"> => {
  "worklet";
  return Object.keys(transform).indexOf("rotateZ") !== -1;
};

/**
 * @worklet
 */
const exhaustiveCheck = (a: never): never => {
  "worklet";
  throw new Error(`Unexhaustive handling for ${a}`);
};

export const identity3: Matrix3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];

/**
 * @worklet
 */
const translateXMatrix = (x: number): Matrix3 => {
  "worklet";
  return [1, 0, x, 0, 1, 0, 0, 0, 1];
};

/**
 * @worklet
 */
const translateYMatrix = (y: number): Matrix3 => {
  "worklet";
  return [1, 0, 0, 0, 1, y, 0, 0, 1];
};

/**
 * @worklet
 */
const scaleMatrix = (s: number): Matrix3 => {
  "worklet";
  return [s, 0, 0, 0, s, 0, 0, 0, 1];
};

/**
 * @worklet
 */
const scaleXMatrix = (s: number): Matrix3 => {
  "worklet";
  return [s, 0, 0, 0, 1, 0, 0, 0, 1];
};

/**
 * @worklet
 */
const scaleYMatrix = (s: number): Matrix3 => {
  "worklet";
  return [1, 0, 0, 0, s, 0, 0, 0, 1];
};

/**
 * @worklet
 */
const skewXMatrix = (s: number): Matrix3 => {
  "worklet";
  return [1, Math.tan(s), 0, 0, 1, 0, 0, 0, 1];
};

/**
 * @worklet
 */
const skewYMatrix = (s: number): Matrix3 => {
  "worklet";
  return [1, 0, 0, Math.tan(s), 1, 0, 0, 0, 1];
};

/**
 * @worklet
 */
const rotateZMatrix = (r: number): Matrix3 => {
  "worklet";
  return [
    Math.cos(r),
    -1 * Math.sin(r),
    0,
    Math.sin(r),
    Math.cos(r),
    0,
    0,
    0,
    1,
  ];
};

/**
 * @worklet
 */
export const dot3 = (row: Vec3, col: Vec3) => {
  "worklet";
  return row[0] * col[0] + row[1] * col[1] + row[2] * col[2];
};

/**
 * @worklet
 */
export const matrixVecMul3 = (m: Matrix3, v: Vec3) => {
  "worklet";
  return [
    dot3([m[0], m[1], m[2]], v),
    dot3([m[3], m[4], m[5]], v),
    dot3([m[6], m[7], m[8]], v),
  ] as const;
};

/**
 * @worklet
 */
export const mapPoint = (m: Matrix3, v: Vec2) => {
  "worklet";
  const r = matrixVecMul3(m, [v[0], v[1], 1]);
  return [r[0] / r[2], r[1] / r[2]] as const;
};

/**
 * @worklet
 */
export const multiply3 = (m1: Matrix3, m2: Matrix3) => {
  "worklet";
  const row0 = [m1[0], m1[1], m1[2]] as const;
  const row1 = [m1[3], m1[4], m1[5]] as const;
  const row2 = [m1[6], m1[7], m1[8]] as const;
  const col0 = [m2[0], m2[3 + 0], m2[6 + 0]] as const;
  const col1 = [m2[1], m2[3 + 1], m2[6 + 1]] as const;
  const col2 = [m2[2], m2[3 + 2], m2[6 + 2]] as const;
  return [
    dot3(row0, col0),
    dot3(row0, col1),
    dot3(row0, col2),
    dot3(row1, col0),
    dot3(row1, col1),
    dot3(row1, col2),
    dot3(row2, col0),
    dot3(row2, col1),
    dot3(row2, col2),
  ] as const;
};

/**
 * @worklet
 */
const serializeToSVGMatrix = (m: Matrix3) => {
  "worklet";
  return `matrix(${m[0]}, ${m[3 + 0]}, ${m[1]}, ${m[3 + 1]}, ${m[2]}, ${
    m[3 + 2]
  })`;
};

/**
 * @worklet
 */
export const svgMatrix = (transforms: Transforms2d) => {
  "worklet";
  return serializeToSVGMatrix(processTransform2d(transforms));
};

/**
 * @worklet
 */
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
  }, identity3);
};

/**
 * @worklet
 */
const isMatrix3 = (arg: Matrix3 | Transforms2d): arg is Matrix3 => {
  "worklet";
  return arg.length === 9 && arg[0] instanceof Array;
};

// https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix

// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
// https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
// http://jsfiddle.net/dFrHS/1/
/**
 * @worklet
 */
export const decompose2d = (arg: Matrix3 | Transforms2d) => {
  "worklet";
  const m = isMatrix3(arg) ? arg : processTransform2d(arg);
  const a = m[0];
  const b = m[3 + 0];
  const c = m[1];
  const d = m[3 + 1];
  const translateX = m[2];
  const translateY = m[3 + 2];
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
