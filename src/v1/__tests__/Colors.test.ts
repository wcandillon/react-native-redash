import { processColor } from "react-native";
import Animated from "react-native-reanimated";

import { blue, green, hsv2rgb, mixColor, opacity, red } from "../Colors";

const { color, Value } = Animated;
jest.mock("react-native-reanimated");

test("white", () => {
  expect(color(255, 255, 255, 1)[" __value"]).toBe(processColor("#ffffff"));
});

test("black", () => {
  expect(color(0, 0, 0)[" __value"]).toBe(processColor("black"));
});

test("blue 1", () => {
  expect(color(0, 255, 255, 1)[" __value"]).toBe(processColor("#00ffffff"));
});

test("blue 2", () => {
  expect(color(0, 255, 255)[" __value"]).toBe(processColor("#00ffff"));
});

test("green 1", () => {
  expect(color(0, 255, 128)[" __value"]).toBe(processColor("#00ff80"));
});

test("opacity", () => {
  expect(color(0, 0, 0, 0.5)[" __value"]).toBe(
    processColor("rgba(0, 0, 0, 0.5)")
  );
});

test("blue", () => {
  expect(blue(processColor("#0000ff"))).toBe(255);
  expect(blue(processColor("#ffffff"))).toBe(255);
  expect(blue(processColor("#ffff0000"))).toBe(0);
});

test("green", () => {
  expect(green(processColor("#00ffff"))).toBe(255);
  expect(green(processColor("#ffffff"))).toBe(255);
  expect(green(processColor("#ffff0000"))).toBe(255);
  expect(green(processColor("#ff000000"))).toBe(0);
  expect(green(processColor("#008000"))).toBe(128);
});

test("red", () => {
  expect(red(processColor("#00ffff"))).toBe(0);
  expect(red(processColor("#ffffff"))).toBe(255);
  expect(red(processColor("#ffff0000"))).toBe(255);
  expect(red(processColor("#00ff0000"))).toBe(0);
});

test("opacity 2", () => {
  const round = (v: number) => Math.round(v * 10) / 10;
  expect(opacity(0xff000000)).toBe(1);
  expect(opacity(0x00000000)).toBe(0);
  expect(opacity(processColor("#00ffff"))).toBe(1);
  expect(opacity(processColor("#ffffffff"))).toBe(1);
  expect(round(opacity(processColor("#ffff0000")))).toBe(0);
  expect(round(opacity(processColor("#00ff0000")))).toBe(0);
  expect(round(opacity(processColor("#00ff0080")))).toBe(0.5);
  expect(round(opacity(processColor("rgba(0, 0, 0, 0.5)")))).toBe(0.5);
});

test("simple interpolation 1", () => {
  expect(mixColor(new Value(0), "white", "black")[" __value"]).toBe(
    processColor("#ffffff")
  );
});

test("simple interpolation 2", () => {
  expect(mixColor(new Value(1), "white", "black")[" __value"]).toBe(
    processColor("#000000")
  );
});

test("simple interpolation 3", () => {
  expect(mixColor(new Value(0.5), 0x00ff00, 0x0000ff)[" __value"]).toBe(
    0x008080
  );
});

test("hsv2rgb 1", () => {
  const { r, g, b } = hsv2rgb(0, 0, 1);
  expect(r[" __value"]).toBe(255);
  expect(g[" __value"]).toBe(255);
  expect(b[" __value"]).toBe(255);
});

test("hsv2rgb 2", () => {
  const { r, g, b } = hsv2rgb(0.5, 0.5, 0.5);
  expect(r[" __value"]).toBe(64);
  expect(g[" __value"]).toBe(128);
  expect(b[" __value"]).toBe(128);
});

test("hsv2rgb 3", () => {
  const { r, g, b } = hsv2rgb(0.5, 0.5, 1);
  expect(r[" __value"]).toBe(128);
  expect(g[" __value"]).toBe(255);
  expect(b[" __value"]).toBe(255);
});
