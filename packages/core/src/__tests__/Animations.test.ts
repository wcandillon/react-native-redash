import { snapPoint } from "../Animations";

test("snapTo()", () => {
  expect(snapPoint(5, -2, [0, 10])).toBe(0);
  expect(snapPoint(5, 2, [0, 10])).toBe(10);
});
