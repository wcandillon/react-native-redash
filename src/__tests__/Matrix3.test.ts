import { processTransform2d, serializeToSVGMatrix } from "../Matrix3";

test("processTransform3d()", () => {
  const width = 100;
  const height = 100;
  expect(
    serializeToSVGMatrix(
      processTransform2d([
        { translateX: width / 2 },
        { translateY: height / 2 },
        { rotate: Math.PI / 2 },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
      ])
    )
  ).toStrictEqual(
    "matrix(6.123233995736766e-17, 1, -1, 6.123233995736766e-17, 100, -3.061616997868383e-15)"
  );
});
