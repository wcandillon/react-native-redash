import { atan2, round } from "../Math";

jest.mock("react-native-reanimated");

test("atan2()", () => {
  expect(atan2(100, 100)[" __value"]).toBe(Math.atan2(100, 100));
  expect(atan2(0, 0)[" __value"]).toBe(Math.atan2(0, 0));
  expect(atan2(0, 100)[" __value"]).toBe(Math.atan2(0, 100));
  expect(atan2(100, 0)[" __value"]).toBe(Math.atan2(100, 0));
});

test("round()", () => {
  expect(round(5.123, 0)[" __value"]).toBe(5);
  expect(round(5.123, 1)[" __value"]).toBe(5.1);
  expect(round(5.123, 2)[" __value"]).toBe(5.12);
  expect(round(5.123, 3)[" __value"]).toBe(5.123);
});
