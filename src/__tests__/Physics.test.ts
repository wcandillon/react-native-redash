import { snapPoint } from "../Physics";

test("snapPoint()", () => {
  expect(snapPoint(5, -2, [0, 10])).toBe(0);
  expect(snapPoint(5, 2, [0, 10])).toBe(10);
  expect(snapPoint(-432, -272, [0, -125, -393])).toBe(-393);
});
