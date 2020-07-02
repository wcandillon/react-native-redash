import {
  canvas2Cartesian,
  cartesian2Canvas,
  cartesian2Polar,
  polar2Cartesian,
} from "../Coordinates";

test("canvas2Cartesian 1", () => {
  const point = canvas2Cartesian({ x: 500, y: 200 }, { x: 500, y: 200 });
  expect(point.x).toBe(0);
  expect(point.y).toBe(-0);
});

test("canvas2Cartesian 2", () => {
  const point = canvas2Cartesian({ x: 0, y: 0 }, { x: 500, y: 200 });
  expect(point.x).toBe(-500);
  expect(point.y).toBe(200);
});

test("canvas2Cartesian 3", () => {
  const point = canvas2Cartesian({ x: 600, y: 300 }, { x: 500, y: 200 });
  expect(point.x).toBe(100);
  expect(point.y).toBe(-100);
});

test("cartesian2Canvas 1", () => {
  const point = cartesian2Canvas({ x: 0, y: 0 }, { x: 500, y: 200 });
  expect(point.x).toBe(500);
  expect(point.y).toBe(200);
});

test("cartesian2Canvas 2", () => {
  const point = cartesian2Canvas({ x: -500, y: 200 }, { x: 500, y: 200 });
  expect(point.x).toBe(0);
  expect(point.y).toBe(0);
});

test("cartesian2Canvas 3", () => {
  const point = cartesian2Canvas({ x: 100, y: -100 }, { x: 500, y: 200 });
  expect(point.x).toBe(600);
  expect(point.y).toBe(300);
});

test("cartesian2Polar 1", () => {
  const x = 0;
  const y = 100;
  const center = { x: 100, y: 100 };
  const { theta, radius } = cartesian2Polar(canvas2Cartesian({ x, y }, center));
  expect(theta).toBe(-Math.PI);
  expect(radius).toBe(100);
  const { x: x1, y: y1 } = cartesian2Canvas(
    polar2Cartesian({ theta, radius }),
    center
  );
  expect(x1).toBe(0);
  expect(Math.round(y1)).toBe(100);
});
