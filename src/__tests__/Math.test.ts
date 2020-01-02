import { atan2 } from "../Math";

jest.mock("react-native-reanimated");

test("atan2", () => {
  expect(atan2(100, 100)[" __value"]).toBe(Math.atan2(100, 100));
});
