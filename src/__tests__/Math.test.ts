import { atan2, round } from "../Math";

jest.mock("react-native-reanimated");

test("atan2", () => {
  expect(atan2(100, 100)[" __value"]).toBe(Math.atan2(100, 100));
});

test("round 1", () => {
  expect(round(5.123)[" __value"]).toBe(5);
});

test("round 2", () => {
  expect(round(5.123, 1)[" __value"]).toBe(5.1);
});

test("round 3", () => {
  expect(round(5.123, 2)[" __value"]).toBe(5.12);
});

test("round 4", () => {
  expect(round(5.123, 3)[" __value"]).toBe(5.123);
});
