import * as path from "svg-path-properties";
import Animated from "react-native-reanimated";

import { find } from "./Arrays";

const {
  Value,
  cond,
  and,
  greaterOrEq,
  lessOrEq,
  interpolate,
  eq,
} = Animated;

interface Parts {
  search: { startX: number; endX: number; startY: number; endY: number; }[];
  startX: number[];
  startY: number[];
  endX: number[];
  endY: number[];
}

const getParts = (d: string): Parts => {
  const properties = path.svgPathProperties(d);
  const parts = properties.getParts();
  const search: { startX: number; endX: number }[] = [];
  const startX: number[] = [];
  const startY: number[] = [];
  const endX: number[] = [];
  const endY: number[] = [];
  parts.forEach((part) => {
    search.push({ startX: part.start.x, endX: part.end.x });
    startX.push(part.start.x);
    startY.push(part.start.y);
    endX.push(part.end.x);
    endY.push(part.end.y);
  });
  return {
    search,
    startX,
    startY,
    endX,
    endY,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const getY = (d: string, x: Animated.Node<number>): Animated.Node<number> => {
  const parts = getParts(d);
  const notFound: Animated.Node<number> = new Value(-1);
  const index = parts.search.reduce(
    (acc, p, i) => cond(and(greaterOrEq(x, p.startX), lessOrEq(x, p.endX)), i, acc),
    notFound,
  );
  const startX = find(parts.startX, index);
  const startY = find(parts.startY, index);
  const endX = find(parts.endX, index);
  const endY = find(parts.endY, index);
  const y = interpolate(x, {
    inputRange: [startX, endX],
    outputRange: [startY, endY],
  });
  return cond(eq(index, notFound), notFound, y);
};

export const getX = (d: string, y: Animated.Node<number>): Animated.Node<number> => {
  const parts = getParts(d);
  const notFound: Animated.Node<number> = new Value(-1);
  const index = parts.search.reduce(
    (acc, p, i) => cond(and(greaterOrEq(y, p.startY), lessOrEq(y, p.endY)), i, acc),
    notFound,
  );
  const startX = find(parts.startX, index);
  const startY = find(parts.startY, index);
  const endX = find(parts.endX, index);
  const endY = find(parts.endY, index);
  const x = interpolate(y, {
    inputRange: [startY, endY],
    outputRange: [startX, endX],
  });
  return cond(eq(index, notFound), notFound, x);
};
