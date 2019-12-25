/* eslint-disable no-underscore-dangle */
import { atan2 } from "./Math";

jest.mock("react-native-reanimated");

test("atan2", () => {
  expect(Math.round(atan2(100, 100)[" __value"] * 10000)).toBe(
    Math.round(Math.atan2(100, 100) * 10000)
  );
});
