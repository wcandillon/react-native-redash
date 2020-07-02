import { cubicBezierLength } from "../bezier/CubicBezierLength";
import { vec } from "../Vector";

jest.mock("react-native-reanimated");

test("round()", () => {
  const p0 = vec.create(120, 160);
  const p1 = vec.create(28, 319);
  const p2 = vec.create(327, 324);
  const p3 = vec.create(220, 40);
  expect(cubicBezierLength(p0, p1, p2, p3)).toBe(421.883869547632);
});
