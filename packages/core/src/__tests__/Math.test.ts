import { mix, round } from "../Math";

jest.mock("react-native-reanimated");

test("round()", () => {
  expect(round(5.123, 0)).toBe(5);
  expect(round(5.123, 1)).toBe(5.1);
  expect(round(5.123, 2)).toBe(5.12);
  expect(round(5.123, 3)).toBe(5.123);
});

test("mix()", () => {
  expect(mix(0, 10, 20)).toBe(10);
  expect(mix(1, 10, 20)).toBe(20);
  expect(mix(0.5, 10, 20)).toBe(15);
  expect(mix(0.25, 10, 20)).toBe(12.5);
  expect(mix(0.8, 10, 20)).toBe(18);
});
