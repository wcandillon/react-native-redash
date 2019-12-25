import { canvas2Cartesian, cartesian2Canvas } from "./Coordinates";

jest.mock("react-native-reanimated");

test("canvas2Cartesian 1", () => {
  const point = canvas2Cartesian({ x: 500, y: 200 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(0);
  expect(point.y[" __value"]).toBe(-0);
});

test("canvas2Cartesian 2", () => {
  const point = canvas2Cartesian({ x: 0, y: 0 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(-500);
  expect(point.y[" __value"]).toBe(200);
});

test("canvas2Cartesian 3", () => {
  const point = canvas2Cartesian({ x: 600, y: 300 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(100);
  expect(point.y[" __value"]).toBe(-100);
});

test("cartesian2Canvas 1", () => {
  const point = cartesian2Canvas({ x: 0, y: 0 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(500);
  expect(point.y[" __value"]).toBe(200);
});

test("cartesian2Canvas 2", () => {
  const point = cartesian2Canvas({ x: -500, y: 200 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(0);
  expect(point.y[" __value"]).toBe(0);
});

test("canvas2Cartesian 3", () => {
  const point = cartesian2Canvas({ x: 100, y: -100 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(600);
  expect(point.y[" __value"]).toBe(300);
});
