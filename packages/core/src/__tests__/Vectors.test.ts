import { vec } from "../Vectors";

jest.mock("react-native-reanimated");

test("add", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(1, 1);
  const result = vec.createValue(4, 4);
  expect(vec.add(a, b, c, d)).toEqual(result);
});

test("sub", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(1, 1);
  const result = vec.createValue(-2, -2);
  expect(vec.sub(a, b, c, d)).toEqual(result);
});

test("multiply", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(2, 2);
  const result = vec.createValue(2, 2);
  expect(vec.multiply(a, b, c, d)).toEqual(result);
  expect(vec.multiply(2, 1, 1, 1)).toEqual(result);
});

test("divide", () => {
  const a = vec.create(1, 1);
  const b = vec.create(1, 1);
  const c = vec.create(1, 1);
  const d = vec.create(2, 2);
  const result = vec.createValue(0.5, 0.5);
  expect(vec.divide(a, b, c, d)).toEqual(result);
});

test("invert", () => {
  const a = vec.create(1, 1);
  const r1 = vec.createValue(-1, -1);
  expect(vec.invert(a)).toEqual(r1);
  const b = vec.create(-1, -1);
  const r2 = vec.createValue(1, 1);
  expect(vec.invert(b)).toEqual(r2);
});

test("clamp", () => {
  const v1 = vec.create(-1, -1);
  const v2 = vec.create(2, 2);
  const v3 = vec.create(0.3, 0.2);
  const min = vec.create(0, 0);
  const max = vec.create(1, 1);
  const r1 = vec.createValue(0, 0);
  const r2 = vec.createValue(1, 1);
  const r3 = vec.createValue(0.3, 0.2);
  expect(vec.clamp(v1, min, max)).toEqual(r1);
  expect(vec.clamp(v2, min, max)).toEqual(r2);
  expect(vec.clamp(v3, min, max)).toEqual(r3);
});

test("single value", () => {
  const v1 = -1;
  const v2 = 2;
  const v3 = vec.create(0.3, 0.2);
  const min = vec.create(0, 0);
  const max = vec.create(1, 1);
  const r1 = vec.createValue(0, 0);
  const r2 = vec.createValue(1, 1);
  const r3 = vec.createValue(0.3, 0.2);
  expect(vec.clamp(v1, min, max)).toEqual(r1);
  expect(vec.clamp(v2, min, max)).toEqual(r2);
  expect(vec.clamp(v3, min, max)).toEqual(r3);
});
