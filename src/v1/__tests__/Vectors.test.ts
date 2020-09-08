import { vec } from "../Vectors";

jest.mock("react-native-reanimated");

test("create()", () => {
  const a = vec.create(1, 0);
  expect(a.x).toEqual(1);
  expect(a.y).toEqual(0);

  const b = vec.create();
  expect(b.x).toEqual(0);
  expect(b.y).toEqual(0);

  const c = vec.create(1);
  expect(c.x).toEqual(1);
  expect(c.y).toEqual(1);

  const d = vec.create(10, 10);
  expect(d.x).toEqual(10);
  expect(d.y).toEqual(10);

  const e = vec.create(-5, 0);
  expect(e.x).toEqual(-5);
  expect(e.y).toEqual(0);

  const a1 = vec.createValue(1, 0);
  expect(a1.x[" __value"]).toEqual(1);
  expect(a1.y[" __value"]).toEqual(0);

  const b1 = vec.createValue();
  expect(b1.x[" __value"]).toEqual(0);
  expect(b1.y[" __value"]).toEqual(0);

  const c1 = vec.createValue(1);
  expect(c1.x[" __value"]).toEqual(1);
  expect(c1.y[" __value"]).toEqual(1);

  const d1 = vec.createValue(10, 10);
  expect(d1.x[" __value"]).toEqual(10);
  expect(d1.y[" __value"]).toEqual(10);

  const e1 = vec.createValue(-5, 0);
  expect(e1.x[" __value"]).toEqual(-5);
  expect(e1.y[" __value"]).toEqual(0);
});

test("add", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(1, 1);
  const e = vec.create();
  const result = vec.createValue(4, 4);
  expect(vec.add(a, b, c, d, e)).toEqual(result);
});

test("sub", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(1, 1);
  const e = vec.create();
  const result = vec.createValue(-2, -2);
  expect(vec.sub(a, b, c, d, e)).toEqual(result);
});

test("multiply", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(2, 2);
  const result = vec.createValue(2, 2);
  expect(vec.mul(a, b, c, d)).toEqual(result);
  expect(vec.mul(2, 1, 1, 1)).toEqual(result);
});

test("divide", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(2, 2);
  const result = vec.createValue(0.5, 0.5);
  expect(vec.div(a, b, c, d)).toEqual(result);
});

test("invert", () => {
  const a = vec.create(1, 1);
  const r1 = vec.createValue(-1, -1);
  expect(vec.minus(a)).toEqual(r1);
  const b = vec.create(-1, -1);
  const r2 = vec.createValue(1, 1);
  expect(vec.minus(b)).toEqual(r2);
});

test("clamp", () => {
  const v1 = vec.create(-1, -1);
  const v2 = vec.create(2, 2);
  const v3 = vec.create(0.3, 0.2);
  const min = vec.create(0);
  const max = vec.create(1, 1);
  const r1 = vec.createValue();
  const r2 = vec.createValue(1, 1);
  const r3 = vec.createValue(0.3, 0.2);
  expect(vec.clamp(v1, min, max)).toEqual(r1);
  expect(vec.clamp(v2, min, max)).toEqual(r2);
  expect(vec.clamp(v3, min, max)).toEqual(r3);
});

test("min", () => {
  const v1 = vec.create(-1, -1);
  const v2 = vec.create(2, 2);
  const r1 = vec.createValue(-1);
  const r2 = vec.createValue();
  expect(vec.min(v1, 0)).toEqual(r1);
  expect(vec.min(v2, 0)).toEqual(r2);
});

test("max", () => {
  const v1 = vec.create(-1, -1);
  const v2 = vec.create(2, 2);
  const r1 = vec.createValue();
  const r2 = vec.createValue(2, 2);
  expect(vec.max(v1, 0)).toEqual(r1);
  expect(vec.max(v2, 0)).toEqual(r2);
});

test("single value", () => {
  const v1 = -1;
  const v2 = 2;
  const v3 = vec.create(0.3, 0.2);
  const min = vec.create(0);
  const max = vec.create(1, 1);
  const r1 = vec.createValue();
  const r2 = vec.createValue(1, 1);
  const r3 = vec.createValue(0.3, 0.2);
  expect(vec.clamp(v1, min, max)).toEqual(r1);
  expect(vec.clamp(v2, min, max)).toEqual(r2);
  expect(vec.clamp(v3, min, max)).toEqual(r3);
});

test("trigo", () => {
  const v1 = -1;
  const v2 = 2;
  const v3 = vec.create(0.3, 0.2);
  const r1 = vec.createValue(Math.cos(v1));
  const r2 = vec.createValue(Math.sin(v2));
  const r3 = vec.createValue(Math.cos(0.3), Math.cos(0.2));
  expect(vec.cos(v1)).toEqual(r1);
  expect(vec.sin(v2)).toEqual(r2);
  expect(vec.cos(v3)).toEqual(r3);
});
