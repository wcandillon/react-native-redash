import {
  identity4,
  matrixVecMul4,
  multiply4,
  // concat4,
  // multiply4,
  // identity4,
  // matrixVecMul4,
  // mapPoint3d,
  processTransform3d,
} from "../Matrix4";

import {
  identity,
  rotated,
  multiply,
  transformPoint,
  translated,
  scaled,
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

  //   it("can multiply 4x4 matrices", () => {
  //     const a = [
  //       0.1, 0.2, 0.3, 0.4, 0.0, 0.6, 0.7, 0.8, 0.9, -0.9, -0.8, -0.7, -0.6, -0.5,
  //       -0.4, -0.3,
  //     ] as const;
  //     const b = [
  //       2.0, 3.0, 4.0, 5.0, -3.0, -4.0, -5.0, -6.0, 7.0, 8.0, 9.0, 10.0, -4.0,
  //       -3.0, -2.0, -1.0,
  //     ] as const;
  //     const expected = [
  //       0.8000000000000003, -3.9000000000000004, -2.5000000000000004,
  //       -1.0999999999999996, -1.2000000000000002, 4.5, 2.7000000000000006,
  //       0.8999999999999995, 2.799999999999999, -6.8999999999999995,
  //       -3.500000000000001, -0.09999999999999876, -1.6, -0.2999999999999996,
  //       -1.2999999999999998, -2.3000000000000003,
  //     ] as const;
  //     expect(multiply4(a, b)).toEqual(expected);
  //   });

  //   it("maps 3D points correctly with a 3x3 matrix", () => {
  //     const a = processTransform3d([
  //       { translateX: 10 },
  //       { scale: 2 },
  //       { translateX: 20 },
  //       { translateZ: 10 },
  //     ]);
  //     expect(mapPoint3d(a, [0, 0, 10])).toEqual([50, 0, 20]);
  //     const b = processTransform3d([
  //       { translateX: 10 },
  //       { translateY: 20 },
  //       { translateZ: 30 },
  //     ]);
  //     expect(mapPoint3d(b, [0, 0, 0])).toEqual([10, 20, 30]);
  //     expect(
  //       concat4(
  //         concat4(b, [
  //           { translateX: 10 },
  //           { translateY: 20 },
  //           { translateZ: 30 },
  //         ]),
  //         [{ translateX: 10 }, { translateY: 20 }, { translateZ: 30 }]
  //       )
  //     ).toEqual(
  //       processTransform3d([
  //         { translateX: 30 },
  //         { translateY: 60 },
  //         { translateZ: 90 },
  //       ])
  //     );
  //   });
});
