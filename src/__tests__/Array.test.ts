import { move } from "../Array";

test("reorder()", () => {
  expect(move([0, 1, 2, 3, 4], 2, 0)).toStrictEqual([2, 0, 1, 3, 4]);
  expect(move([0, 1, 2, 3, 4], 3, 2)).toStrictEqual([0, 1, 3, 2, 4]);
});
