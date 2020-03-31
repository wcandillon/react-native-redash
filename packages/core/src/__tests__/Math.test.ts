import { atan2, round } from "../Math";

jest.mock("react-native-reanimated");

test("atan2()", () => {
  expect(atan2(100, 100)[" __value"]).toBe(Math.atan2(100, 100));
});

test("round()", () => {
  expect(round(5.123)[" __value"]).toBe(5);
  expect(round(5.123, 1)[" __value"]).toBe(5.1);
  expect(round(5.123, 2)[" __value"]).toBe(5.12);
  expect(round(5.123, 3)[" __value"]).toBe(5.123);
});
