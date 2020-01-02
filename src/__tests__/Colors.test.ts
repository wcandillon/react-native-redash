import { processColor } from "react-native";
import Animated from "react-native-reanimated";
import { bInterpolateColor } from "../Colors";

const { Value } = Animated;
jest.mock("react-native-reanimated");

test("atan2", () => {
  expect(bInterpolateColor(new Value(1), "white", "black")[" __value"]).toBe(
    processColor("black")
  );
});
