import { snapPoint } from "../Animations";

jest.mock("react-native-reanimated");

test("snapTo()", () => {
  expect(snapPoint(5, -2, [0, 10])[" __value"]).toBe(0);
  expect(snapPoint(5, 2, [0, 10])[" __value"]).toBe(10);
});
