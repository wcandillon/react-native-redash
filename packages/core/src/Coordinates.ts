import Animated from "react-native-reanimated";

import { atan2 } from "./Math";

const { sub, multiply, add, cos, sin, pow, sqrt } = Animated;

export interface Point {
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
}

export interface PolarPoint {
  theta: Animated.Adaptable<number>;
  radius: Animated.Adaptable<number>;
}

export const canvas2Cartesian = ({ x, y }: Point, center: Point) => {
  return {
    x: sub(x, center.x),
    y: multiply(sub(y, center.y), -1),
  };
};

export const cartesian2Canvas = ({ x, y }: Point, center: Point) => ({
  x: add(x, center.x),
  y: add(multiply(y, -1), center.y),
});

export const cartesian2Polar = ({ x, y }: Point) => {
  return {
    theta: atan2(y, x),
    radius: sqrt(add(pow(x, 2), pow(y, 2))),
  };
};

export const polar2Cartesian = ({ theta, radius }: PolarPoint) => ({
  x: multiply(radius, cos(theta)),
  y: multiply(radius, sin(theta)),
});

export const polar2Canvas = ({ theta, radius }: PolarPoint, center: Point) =>
  cartesian2Canvas(polar2Cartesian({ theta, radius }), center);

export const canvas2Polar = ({ x, y }: Point, center: Point) =>
  cartesian2Polar(canvas2Cartesian({ x, y }, center));
