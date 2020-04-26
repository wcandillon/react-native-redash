import { atan2, round } from "../Math";

jest.mock("react-native-reanimated");

test("atan2()", () => {
  expect(atan2(100, 100)[" __value"]).toBe(Math.atan2(100, 100));
  expect(atan2(0, 0)[" __value"]).toBe(Math.atan2(0, 0));
  expect(atan2(0, 100)[" __value"]).toBe(Math.atan2(0, 100));
  expect(atan2(100, 0)[" __value"]).toBe(Math.atan2(100, 0));
  expect(atan2(50, 25)[" __value"]).toBe(Math.atan2(50, 25));
  expect(atan2(25, 50)[" __value"]).toBe(Math.atan2(25, 50));
  expect(atan2(-1, 0)[" __value"]).toBe(Math.atan2(-1, 0));
  expect(atan2(-3, -4)[" __value"]).toBe(Math.atan2(-3, -4));
  expect(atan2(0, 3)[" __value"]).toBe(Math.atan2(0, 3));
  expect(atan2(0, -3)[" __value"]).toBe(Math.atan2(0, -3));
});

test("round()", () => {
  expect(round(5.123, 0)[" __value"]).toBe(5);
  expect(round(5.123, 1)[" __value"]).toBe(5.1);
  expect(round(5.123, 2)[" __value"]).toBe(5.12);
  expect(round(5.123, 3)[" __value"]).toBe(5.123);
});
