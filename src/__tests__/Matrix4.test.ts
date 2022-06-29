import {
  multiply4,
  identityMatrix4,
  matrixVecMul4,
  processTransform3d,
  mapPoint3d,
} from "../Matrix4";

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
  expect(
    processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }])
  ).toStrictEqual([
    -1, 0, 1.2246467991473532e-16, 0, 1.4997597826618576e-32, -1,
    1.2246467991473532e-16, 0, 1.2246467991473532e-16, 1.2246467991473532e-16,
    1, 0, 0, 0, 0, 1,
  ]);
});

test("multiply4()", () => {
  expect(
    multiply4(
      identityMatrix4,
      processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }])
    )
  ).toStrictEqual([
    -1, 0, 1.2246467991473532e-16, 0, 1.4997597826618576e-32, -1,
    1.2246467991473532e-16, 0, 1.2246467991473532e-16, 1.2246467991473532e-16,
    1, 0, 0, 0, 0, 1,
  ]);
});

test("matrixVecMul4()", () => {
  expect(
    matrixVecMul4(
      processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }]),
      [0.5, 0.5, 0, 1]
    )
  ).toStrictEqual([-0.5, -0.5, 1.2246467991473532e-16, 1]);
});

describe("4x4 matrices", () => {
  it("can make a translated 4x4 matrix", () => {
    expectArrayCloseTo(
      processTransform3d([
        { translateX: 5 },
        { translateY: 6 },
        { translateZ: 7 },
      ]),
      [1, 0, 0, 5, 0, 1, 0, 6, 0, 0, 1, 7, 0, 0, 0, 1]
    );
  });

  it("can make a scaled 4x4 matrix", () => {
    expectArrayCloseTo(
      processTransform3d([{ scaleX: 5 }, { scaleY: 6 }]),
      [5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    );
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
    const expected = [
      0.1, 0.7, 1.3, 1.9, -0.1, 0.8, 1.7, 2.6, 1.7, 2.0, 2.3, 2.6, -1.3, -2.1,
      -2.9, -3.7,
    ] as const;
    expectArrayCloseTo(multiply4(a, b), expected);
  });

  it("maps 3D points correctly with a 3x3 matrix", () => {
    const a = processTransform3d([
      { translateX: 10 },
      { scale: 2 },
      { translateX: 20 },
      { translateZ: 10 },
    ]);
    expect(mapPoint3d(a, [0, 0, 10])).toEqual([50, 0, 20]);
  });
});
