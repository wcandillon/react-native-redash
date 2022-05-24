import { interpolateColor } from "react-native-reanimated";

import { clamp, fract, mix } from "./Math";

export type AnimatedColor = string | number;

/**
 * @summary Returns black or white depending on the value of the background color.
 * @worklet
 */
export const isLight = (r: number, g: number, b: number) => {
  "worklet";
  const L = 0.299 * r + 0.587 * g + 0.114 * b;
  return L > 186;
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

export const hsv2rgb = (h: number, s: number, v: number) => {
  "worklet";
  const K = {
    x: 1,
    y: 2 / 3,
    z: 1 / 3,
    w: 3,
  };
  const p = {
    x: Math.abs(fract(h + K.x) * 6 - K.w),
    y: Math.abs(fract(h + K.y) * 6 - K.w),
    z: Math.abs(fract(h + K.z) * 6 - K.w),
  };
  // return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  const rgb = {
    x: v * mix(s, K.x, clamp(p.x - K.x, 0, 1)),
    y: v * mix(s, K.x, clamp(p.y - K.x, 0, 1)),
    z: v * mix(s, K.x, clamp(p.z - K.x, 0, 1)),
  };

  const r = Math.round(rgb.x * 255);
  const g = Math.round(rgb.y * 255);
  const b = Math.round(rgb.z * 255);

  return { r, g, b };
};

export const opacity = (c: number): number => {
  "worklet";
  return ((c >> 24) & 255) / 255;
};

export const red = (c: number): number => {
  "worklet";
  return (c >> 16) & 255;
};

export const green = (c: number): number => {
  "worklet";
  return (c >> 8) & 255;
};

export const blue = (c: number): number => {
  "worklet";
  return c & 255;
};
