import { atan2, round } from "../Math";
import { mix } from "../Animations";

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

test("mix()", () => {
  expect(mix(0, 10, 20)[" __value"]).toBe(10);
  expect(mix(1, 10, 20)[" __value"]).toBe(20);
  expect(mix(0.5, 10, 20)[" __value"]).toBe(15);
  expect(mix(0.25, 10, 20)[" __value"]).toBe(12.5);
  expect(mix(0.8, 10, 20)[" __value"]).toBe(18);
});
