import { bInterpolate } from "../Animations";

jest.mock("react-native-reanimated");

test("bInterpolate()", () => {
  expect(bInterpolate(0, 10, 20)[" __value"]).toBe(10);
  expect(bInterpolate(1, 10, 20)[" __value"]).toBe(20);
  expect(bInterpolate(0.5, 10, 20)[" __value"]).toBe(15);
  expect(bInterpolate(0.25, 10, 20)[" __value"]).toBe(12.5);
  expect(bInterpolate(0.8, 10, 20)[" __value"]).toBe(18);
});
