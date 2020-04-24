import { accumulatedTransform } from "../Matrix";
import { vec } from "../Vectors";
import {
  rotateTranslation,
  scaleTranslation,
  transformOrigin,
  translate,
} from "../Transformations";

jest.mock("react-native-reanimated");

test("accumulatedTransform()", () => {
  const tr = vec.create(10, 10);
  const origin = vec.create(5, 5);
  const scale = 2.3;
  const { translateX, translateY, scale: scaleOffset } = accumulatedTransform([
    { translateX: tr.x },
    { translateY: tr.y },
    { translateX: origin.x },
    { translateY: origin.y },
    { scale },
    { translateX: -origin.x },
    { translateY: -origin.y },
  ]);
  expect(translateX[" __value"]).toBe(10 + 5 - 5 * scale);
  expect(translateY[" __value"]).toBe(10 + 5 - 5 * scale);
  const t = vec.add(
    tr,
    origin,
    scaleTranslation(vec.multiply(-1, origin), scale)
  );
  expect(translateX[" __value"]).toBe(t.x[" __value"]);
  expect(translateY[" __value"]).toBe(t.y[" __value"]);
  expect(scaleOffset[" __value"]).toBe(2.3);
});

test("accumulatedTransform() 1", () => {
  const tr = vec.create(10, 10);
  const origin = vec.create(5, 5);
  const { translateX, translateY, scale } = accumulatedTransform([
    ...translate(tr),
    ...transformOrigin(origin, { scale: 2.3 }),
  ]);
  expect(translateX[" __value"]).toBe(10 + 5 - 5 * 2.3);
  expect(translateY[" __value"]).toBe(10 + 5 - 5 * 2.3);
  expect(scale[" __value"]).toBe(2.3);
});

test("accumulatedTransform() 2", () => {
  const tr = vec.create(10, 10);
  const origin = vec.create(-5, 0);
  const { translateX, translateY, scale, rotateZ } = accumulatedTransform([
    ...translate(tr),
    ...transformOrigin(origin, { rotateZ: Math.PI / 6 }),
  ]);
  expect(translateX[" __value"]).toBe(
    tr.x +
      origin.x +
      -origin.x * (Math.cos(Math.PI / 6) - -origin.y * Math.sin(Math.PI / 6))
  );
  expect(translateY[" __value"]).toBe(
    tr.y +
      origin.y +
      -origin.x * (Math.sin(Math.PI / 6) + -origin.y * Math.cos(Math.PI / 6))
  );
  const t = vec.add(
    tr,
    origin,
    rotateTranslation(vec.multiply(-1, origin), Math.PI / 6)
  );
  expect(translateX[" __value"]).toBe(t.x[" __value"]);
  expect(t.y[" __value"]);
  expect(scale[" __value"]).toBe(1);
  expect(rotateZ[" __value"]).toBeCloseTo(Math.PI / 6, 15);
});

test("accumulatedTransform() 3", () => {
  const tr = vec.create(10, 10);
  const origin = vec.create(0, 0);
  const { translateX, translateY, scale, rotateZ } = accumulatedTransform([
    ...translate(tr),
    ...transformOrigin(origin, { rotateZ: Math.PI / 6 }),
  ]);
  expect(translateX[" __value"]).toBe(tr.x);
  expect(translateY[" __value"]).toBe(tr.y);
  expect(scale[" __value"]).toBe(1);
  expect(rotateZ[" __value"]).toBeCloseTo(Math.PI / 6, 15);
});
