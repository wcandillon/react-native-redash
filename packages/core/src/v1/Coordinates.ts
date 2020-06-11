import Animated from "react-native-reanimated";

import { atan2 } from "./Math";
import { Vector } from "./Vectors";

const { sub, multiply, add, cos, sin, pow, sqrt } = Animated;

export interface PolarPoint {
  theta: Animated.Adaptable<number>;
  radius: Animated.Adaptable<number>;
}

export const canvas2Cartesian = ({ x, y }: Vector, center: Vector) => {
  return {
    x: sub(x, center.x),
    y: multiply(sub(y, center.y), -1),
  };
};

export const cartesian2Canvas = ({ x, y }: Vector, center: Vector) => ({
  x: add(x, center.x),
  y: add(multiply(y, -1), center.y),
});

export const cartesian2Polar = ({ x, y }: Vector) => {
  return {
    theta: atan2(y, x),
    radius: sqrt(add(pow(x, 2), pow(y, 2))),
  };
};

export const polar2Cartesian = ({ theta, radius }: PolarPoint) => ({
  x: multiply(radius, cos(theta)),
  y: multiply(radius, sin(theta)),
});

export const polar2Canvas = ({ theta, radius }: PolarPoint, center: Vector) =>
  cartesian2Canvas(polar2Cartesian({ theta, radius }), center);

export const canvas2Polar = ({ x, y }: Vector, center: Vector) =>
  cartesian2Polar(canvas2Cartesian({ x, y }, center));
