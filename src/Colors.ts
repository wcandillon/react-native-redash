import { interpolateColor } from "react-native-reanimated";

export type AnimatedColor = string | number;

/**
 * @summary Returns black or white depending on the value of the background color.
 * @worklet
 */
export const colorForBackground = (r: number, g: number, b: number) => {
  "worklet";
  const L = 0.299 * r + 0.587 * g + 0.114 * b;
  return L > 186 ? 0x000000ff : 0xffffffff;
};

/**
 * Interpolate color from 0 to 1
 * @param value
 * @param color1
 * @param color2
 * @param colorSpace
 * @worklet
 */
export const mixColor = (
  value: number,
  color1: AnimatedColor,
  color2: AnimatedColor,
  colorSpace: "RGB" | "HSV" = "RGB"
) => {
  "worklet";
  return interpolateColor(value, [0, 1], [color1, color2], colorSpace);
};
