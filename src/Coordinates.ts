import Animated from "react-native-reanimated";

import { atan2 } from "./Math";

const { sub, multiply, add, cos, sin, pow, sqrt } = Animated;

export interface Point {
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
}

export interface PolarPoint {
  alpha: Animated.Adaptable<number>;
  radius: Animated.Adaptable<number>;
}

export const canvas2Cartesian = ({ x, y }: Point, center: Point) => {
  return {
    x: sub(x, center.x),
    y: multiply(sub(y, center.y), -1)
  };
};

export const cartesian2Canvas = ({ x, y }: Point, center: Point) => ({
  x: add(x, center.x),
  y: add(multiply(y, -1), center.y)
});

export const cartesian2Polar = ({ x, y }: Point) => {
  return {
    alpha: atan2(y, x),
    radius: sqrt(add(pow(x, 2), pow(y, 2)))
  };
};

export const polar2Cartesian = ({ alpha, radius }: PolarPoint) => ({
  x: multiply(radius, cos(alpha)),
  y: multiply(radius, sin(alpha))
});

export const polar2Canvas = ({ alpha, radius }: PolarPoint) =>
  cartesian2Canvas(polar2Cartesian({ alpha, radius }), {
    x: radius,
    y: radius
  });

export const canvas2Polar = ({ x, y }: Point, center: Point) =>
  cartesian2Polar(canvas2Cartesian({ x, y }, center));
