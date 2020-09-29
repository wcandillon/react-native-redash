import { snapPoint } from "../Animations";

jest.mock("react-native-reanimated");

test("snapTo()", () => {
  expect(snapPoint(5, -2, [0, 10])[" __value"]).toBe(0);
  expect(snapPoint(5, 2, [0, 10])[" __value"]).toBe(10);
  expect(snapPoint(-432, -272, [0, -125, -393])[" __value"]).toBe(-393);
});
