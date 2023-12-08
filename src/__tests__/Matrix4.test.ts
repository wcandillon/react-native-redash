import {
  concat4,
  identity4,
  mapPoint3d,
  matrixVecMul4,
  multiply4,
  processTransform3d,
} from "../Matrix4";

import {
  identity,
  rotated,
  multiply,
  transformPoint,
  translated,
  scaled,
  transformPoint3d,
} from "./matrix";

const expectArrayCloseTo = (
  a: readonly number[],
  b: readonly number[],
  precision = 14
) => {
  expect(a.length).toEqual(b.length);
  for (let i = 0; i < a.length; i++) {
    expect(a[i]).toBeCloseTo(b[i], precision);
  }
};

test("processTransform3d()", () => {
  let ref = identity();
  ref = multiply(ref, rotated([1, 0, 0], Math.PI));
  ref = multiply(ref, rotated([0, 1, 0], Math.PI));
  expect(
    processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }])
  ).toStrictEqual(ref);
});

test("multiply4()", () => {
  let ref = identity();
  ref = multiply(ref, rotated([1, 0, 0], Math.PI));
  ref = multiply(ref, rotated([0, 1, 0], Math.PI));
  expect(
    multiply4(
      identity4,
      processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }])
    )
  ).toStrictEqual(ref);
});

test("matrixVecMul4()", () => {
  let ref = identity();
  ref = multiply(ref, rotated([1, 0, 0], Math.PI));
  ref = multiply(ref, rotated([0, 1, 0], Math.PI));
  const refVec = transformPoint(ref, [0.5, 0.5, 0, 1]);
  expect(
    matrixVecMul4(
      processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }]),
      [0.5, 0.5, 0, 1]
    )
  ).toStrictEqual(refVec);
});

describe("4x4 matrices", () => {
  it("can make a translated 4x4 matrix", () => {
    let ref = identity();
    ref = multiply(ref, translated([5, 6, 7]));
    expectArrayCloseTo(
      processTransform3d([
        { translateX: 5 },
        { translateY: 6 },
        { translateZ: 7 },
      ]),
      ref
    );
  });

  it("can make a scaled 4x4 matrix", () => {
    let ref = identity();
    ref = multiply(ref, scaled([5, 6, 1]));
    expectArrayCloseTo(processTransform3d([{ scaleX: 5 }, { scaleY: 6 }]), ref);
  });

  it("can multiply 4x4 matrices", () => {
    const a = [
      0.1, 0.2, 0.3, 0.4, 0.0, 0.6, 0.7, 0.8, 0.9, -0.9, -0.8, -0.7, -0.6, -0.5,
      -0.4, -0.3,
    ] as const;
    const b = [
      2.0, 3.0, 4.0, 5.0, -3.0, -4.0, -5.0, -6.0, 7.0, 8.0, 9.0, 10.0, -4.0,
      -3.0, -2.0, -1.0,
    ] as const;
    let ref = identity();
    ref = multiply(a, b);
    expect(multiply4(a, b)).toEqual(ref);
  });

  it("maps 3D points correctly with a 3x3 matrix", () => {
    // 1.
    let ref = identity();
    ref = multiply(ref, translated([10, 0, 0]));
    ref = multiply(ref, scaled([2, 2, 1]));
    ref = multiply(ref, translated([20, 0, 10]));
    let refVec = transformPoint3d(ref, [0, 0, 10]);
    const a = processTransform3d([
      { translateX: 10 },
      { scale: 2 },
      { translateX: 20 },
      { translateZ: 10 },
    ]);
    expect(a).toEqual(ref);
    expect(mapPoint3d(a, [0, 0, 10])).toEqual(refVec);
    // 2.
    ref = identity();
    ref = multiply(ref, translated([10, 20, 30]));
    refVec = transformPoint3d(ref, [0, 0, 0]);
    const b = processTransform3d([
      { translateX: 10 },
      { translateY: 20 },
      { translateZ: 30 },
    ]);
    expect(mapPoint3d(b, [0, 0, 0])).toEqual(refVec);
    // 3.
    expect(
      concat4(
        concat4(b, [
          { translateX: 10 },
          { translateY: 20 },
          { translateZ: 30 },
        ]),
        [{ translateX: 10 }, { translateY: 20 }, { translateZ: 30 }]
      )
    ).toEqual(
      processTransform3d([
        { translateX: 30 },
        { translateY: 60 },
        { translateZ: 90 },
      ])
    );
  });
});
