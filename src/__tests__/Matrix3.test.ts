import { mapPoint, multiply3, processTransform2d, svgMatrix } from "../Matrix3";

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
  const width = 100;
  const height = 100;
  expect(
    svgMatrix([
      { translateX: width / 2 },
      { translateY: height / 2 },
      { rotate: `${Math.PI / 2}rad` },
      { translateX: -width / 2 },
      { translateY: -height / 2 },
    ])
  ).toStrictEqual(
    "matrix(6.123233995736766e-17, 1, -1, 6.123233995736766e-17, 100, -3.061616997868383e-15)"
  );
});

describe("3x3 matrices", () => {
  it("can make a translated 3x3 matrix", () => {
    expectArrayCloseTo(
      processTransform2d([{ translateX: 5 }, { translateY: -1 }]),
      [1, 0, 5, 0, 1, -1, 0, 0, 1]
    );
  });

  it("can make a scaled 3x3 matrix", () => {
    expectArrayCloseTo(
      processTransform2d([{ scaleX: 2 }, { scaleY: 3 }]),
      [2, 0, 0, 0, 3, 0, 0, 0, 1]
    );
  });

  it("can make a rotated 3x3 matrix", () => {
    expectArrayCloseTo(
      processTransform2d([
        { translateX: 9 },
        { translateY: 9 },
        { rotate: `${Math.PI}rad` },
        { translateX: -9 },
        { translateY: -9 },
      ]),
      [-1, 0, 18, 0, -1, 18, 0, 0, 1]
    );
  });

  it("can multiply 3x3 matrices", () => {
    const a = [0.1, 0.2, 0.3, 0.0, 0.6, 0.7, 0.9, -0.9, -0.8] as const;
    const b = [2.0, 3.0, 4.0, -3.0, -4.0, -5.0, 7.0, 8.0, 9.0] as const;
    const expected = [1.7, 1.9, 2.1, 3.1, 3.2, 3.3, -1.1, -0.1, 0.9];
    expectArrayCloseTo(multiply3(a, b), expected);
  });

  it("maps 2D points correctly with a 3x3 matrix", () => {
    const a = [3, 0, -4, 0, 2, 4, 0, 0, 1] as const;
    expectArrayCloseTo(mapPoint(a, [0, 0]), [-4, 4]);
    expectArrayCloseTo(mapPoint(a, [1, 1]), [-1, 6]);
  });
});
