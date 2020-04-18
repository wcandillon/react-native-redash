import Animated from "react-native-reanimated";
import { atan2 } from "./Math";

const {
  and,
  add,
  cond,
  eq,
  multiply,
  sqrt,
  cos,
  sin,
  sub,
  lessThan,
  divide,
  greaterOrEq,
} = Animated;

type Column4 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];
type Row4 = Column4;
type Matrix4 = [Column4, Column4, Column4, Column4];

type TransformName =
  | "translateX"
  | "translateY"
  | "scale"
  | "rotateZ"
  | "rotate";
type TranslateX = { translateX: Animated.Adaptable<number> };
type TranslateY = { translateY: Animated.Adaptable<number> };
type Scale = { scale: Animated.Adaptable<number> };
type Rotate = { rotate: Animated.Adaptable<number> };
type RotateZ = { rotateZ: Animated.Adaptable<number> };
type Transform = TranslateX | TranslateY | Scale | Rotate | RotateZ;
type Transforms = Transform[];

const exhaustiveCheck = (a: never): never => {
  throw new Error(`Unexhaustive handling for ${a}`);
};

const identityMatrix: Matrix4 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateXMatrix = (x: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, x],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateYMatrix = (y: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [0, 1, 0, y],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const scaleMatrix = (s: Animated.Adaptable<number>): Matrix4 => [
  [s, 0, 0, 0],
  [0, s, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

/*
const rotateXMatrix = (r: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [0, cos(r), multiply(-1, sin(r)), 0],
  [0, sin(r), cos(r), 0],
  [0, 0, 0, 1],
];

const rotateYMatrix = (r: Animated.Adaptable<number>): Matrix4 => [
  [cos(r), 0, sin(r), 0],
  [0, 1, 0, 0],
  [multiply(-1, sin(r)), 0, cos(r), 0],
  [0, 0, 0, 1],
];
*/

const rotateZMatrix = (r: Animated.Adaptable<number>): Matrix4 => [
  [cos(r), multiply(-1, sin(r)), 0, 0],
  [sin(r), cos(r), 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const multiplyRowByCol = (
  row: Row4,
  col: Column4
): Animated.Adaptable<number> => {
  return add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2]),
    multiply(row[3], col[3])
  );
};

const multiply4 = (m1: Matrix4, m2: Matrix4): Matrix4 => {
  const col0 = [m2[0][0], m2[1][0], m2[2][0], m2[3][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1], m2[3][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2], m2[3][2]] as const;
  const col3 = [m2[0][3], m2[1][3], m2[2][3], m2[3][3]] as const;
  return [
    [
      multiplyRowByCol(m1[0], col0),
      multiplyRowByCol(m1[0], col1),
      multiplyRowByCol(m1[0], col2),
      multiplyRowByCol(m1[0], col3),
    ],
    [
      multiplyRowByCol(m1[1], col0),
      multiplyRowByCol(m1[1], col1),
      multiplyRowByCol(m1[1], col2),
      multiplyRowByCol(m1[1], col3),
    ],
    [
      multiplyRowByCol(m1[2], col0),
      multiplyRowByCol(m1[2], col1),
      multiplyRowByCol(m1[2], col2),
      multiplyRowByCol(m1[2], col3),
    ],
    [
      multiplyRowByCol(m1[3], col0),
      multiplyRowByCol(m1[3], col1),
      multiplyRowByCol(m1[3], col2),
      multiplyRowByCol(m1[3], col3),
    ],
  ];
};

// eslint-disable-next-line import/prefer-default-export
export const accumulatedTransform = (transforms: Transforms) => {
  let matrix = identityMatrix;
  transforms.forEach((transform) => {
    const key = Object.keys(transform)[0] as TransformName;
    const value = transform[key] as Animated.Adaptable<number>;
    switch (key) {
      case "translateX":
        matrix = multiply4(matrix, translateXMatrix(value));
        break;
      case "translateY":
        matrix = multiply4(matrix, translateYMatrix(value));
        break;
      case "scale":
        matrix = multiply4(matrix, scaleMatrix(value));
        break;
      case "rotateZ":
        matrix = multiply4(matrix, rotateZMatrix(value));
        break;
      case "rotate":
        matrix = multiply4(matrix, rotateZMatrix(value));
        break;
      default:
        exhaustiveCheck(key);
    }
  });
  // https://www.w3.org/TR/css-transforms-1/#decomposing-a-2d-matrix
  const row0x = matrix[0][0];
  const row0y = matrix[1][0];
  const row1x = matrix[0][1];
  const row1y = matrix[1][1];
  const translateX = matrix[0][3];
  const translateY = matrix[1][3];
  const scaleXAbs = sqrt(add(multiply(row0x, row0x), multiply(row0y, row0y)));
  const scaleYAbs = sqrt(add(multiply(row1x, row1x), multiply(row1y, row1y)));
  const determinant = sub(multiply(row0x, row1y), multiply(row0y, row1x));
  const scaleX = multiply(
    cond(and(lessThan(determinant, 0), lessThan(row0x, row1y)), -1, 1),
    scaleXAbs
  );
  const scaleY = multiply(
    cond(and(lessThan(determinant, 0), greaterOrEq(row0x, row1y)), -1, 1),
    scaleYAbs
  );
  const row0y1 = divide(row0x, scaleX);
  const row0x1 = divide(row0y, scaleX);
  const rotate = atan2(row0y1, row0x1);
  const scale = cond(eq(scaleX, scaleY), scaleX, 1);
  return {
    translateX,
    translateY,
    scaleX,
    scaleY,
    scale,
    rotate,
  };
};
