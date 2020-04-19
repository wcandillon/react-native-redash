import { mix } from "../Math";

jest.mock("react-native-reanimated");

test("mix()", () => {
  expect(mix(0, 10, 20)[" __value"]).toBe(10);
  expect(mix(1, 10, 20)[" __value"]).toBe(20);
  expect(mix(0.5, 10, 20)[" __value"]).toBe(15);
  expect(mix(0.25, 10, 20)[" __value"]).toBe(12.5);
  expect(mix(0.8, 10, 20)[" __value"]).toBe(18);
});
