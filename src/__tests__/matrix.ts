/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const sdot = (...args: number[]): number => {
  let acc = 0;
  for (let i = 0; i < args.length - 1; i += 2) {
    acc += args[i] * args[i + 1];
  }
  return acc;
};

const identityN = (n: number): number[] => {
  let size = n * n;
  const m = new Array(size);
  while (size--) {
    m[size] = size % (n + 1) === 0 ? 1.0 : 0.0;
  }
  return m;
};

export const identity = () => identityN(4);

function isnumber(val: number) {
  return !isNaN(val);
}

const m = (m1: number[], m2: number[]) => {
  const size = 4;
  if (!m1.every(isnumber) || !m2.every(isnumber)) {
    throw "Some members of matrices are NaN m1=" + m1 + ", m2=" + m2 + "";
  }
  if (m1.length !== m2.length) {
    throw (
      "Undefined for matrices of different sizes. m1.length=" +
      m1.length +
      ", m2.length=" +
      m2.length
    );
  }
  if (size * size !== m1.length) {
    throw "Undefined for non-square matrices. array size was " + size;
  }

  const result = Array(m1.length);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // accumulate a sum of m1[r,k]*m2[k, c]
      let acc = 0;
      for (let k = 0; k < size; k++) {
        acc += m1[size * r + k] * m2[size * k + c];
      }
      result[r * size + c] = acc;
    }
  }
  return result;
};

export const multiply = (...listOfMatrices: any[]) => {
  if (listOfMatrices.length < 2) {
    throw "multiplication expected two or more matrices";
  }
  let result = m(listOfMatrices[0], listOfMatrices[1]);
  let next = 2;
  while (next < listOfMatrices.length) {
    result = m(result, listOfMatrices[next]);
    next++;
  }
  return result;
};

export const stride = (
  v: number[],
  m: number[],
  width: number,
  offset: number,
  colStride: number
): number[] => {
  for (let i = 0; i < v.length; i++) {
    m[i * width + ((i * colStride + offset + width) % width)] = v[i];
  }
  return m;
};

const dot = (a: number[], b: number[]): number => {
  if (a.length !== b.length) {
    throw new Error("Arrays must have the same length for dot product.");
  }
  return a.reduce((acc, val, i) => acc + val * b[i], 0);
};

const vectorLengthSquared = (v: number[]): number => dot(v, v);
const vectorLength = (v: number[]): number => Math.sqrt(vectorLengthSquared(v));
const mulScalar = (v: number[], s: number): number[] => v.map((val) => val * s);
// const addVectors = (a: number[], b: number[]): number[] =>
//   a.map((val, i) => val + b[i]);
// const subVectors = (a: number[], b: number[]): number[] =>
//   a.map((val, i) => val - b[i]);
const normalize = (v: number[]): number[] => mulScalar(v, 1 / vectorLength(v));

// const cross = (a: number[], b: number[]): number[] => {
//   if (a.length !== 3 || b.length !== 3) {
//     throw new Error("Cross product is only defined for 3-dimensional vectors.");
//   }
//   return [
//     a[1] * b[2] - a[2] * b[1],
//     a[2] * b[0] - a[0] * b[2],
//     a[0] * b[1] - a[1] * b[0],
//   ];
// };

// Matrix operations
export const translated = (vec: number[]): number[] =>
  stride(vec, identityN(4), 4, 3, 0);

export const scaled = (vec: number[]): number[] =>
  stride(vec, identityN(4), 4, 0, 1);

export const rotated = (axisVec: number[], radians: number): number[] => {
  const normalizedAxisVec = normalize(axisVec);
  const sinRadians = Math.sin(radians);
  const cosRadians = Math.cos(radians);
  return rotatedUnitSinCos(normalizedAxisVec, sinRadians, cosRadians);
};

const rotatedUnitSinCos = (
  axisVec: number[],
  sinAngle: number,
  cosAngle: number
): number[] => {
  const [x, y, z] = axisVec;
  const c = cosAngle;
  const s = sinAngle;
  const t = 1 - c;
  return [
    t * x * x + c,
    t * x * y - s * z,
    t * x * z + s * y,
    0,
    t * x * y + s * z,
    t * y * y + c,
    t * y * z - s * x,
    0,
    t * x * z - s * y,
    t * y * z + s * x,
    t * z * z + c,
    0,
    0,
    0,
    0,
    1,
  ];
};

export const transformPoint = (m: number[], t: number[]): number[] => {
  const x = m[0] * t[0] + m[1] * t[1] + m[2] * t[2] + m[3] * t[3];
  const y = m[4] * t[0] + m[5] * t[1] + m[6] * t[2] + m[7] * t[3];
  const z = m[8] * t[0] + m[9] * t[1] + m[10] * t[2] + m[11] * t[3];
  const w = m[12] * t[0] + m[13] * t[1] + m[14] * t[2] + m[15] * t[3];
  return [x, y, z, w];
};

export const transformPoint3d = (m4: number[], t: number[]): number[] => {
  const [x, y, z, w] = transformPoint(m4, [...t, 1]);
  return [x / w, y / w, z / w];
};
