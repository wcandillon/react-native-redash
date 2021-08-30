import { svgMatrix } from "../Matrix3";

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
