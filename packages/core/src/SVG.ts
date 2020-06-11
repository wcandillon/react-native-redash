import parseSVG from "parse-svg-path";
import absSVG from "abs-svg-path";
import normalizeSVG from "normalize-svg-path";

import { Vector } from "./Vector";
import { cubicBezier } from "./Math";
import { cubicBezierLength } from "./bezier";

type SVGMove = ["M", number, number];
type SVGCurve = ["C", number, number, number, number, number, number];
type SVGPath = [SVGMove, ...SVGCurve[]];

export interface Path {
  curves: BezierCurve[];
  length: number;
}

export interface BezierCurve {
  from: Vector;
  to: Vector;
  c1: Vector;
  c2: Vector;
  start: number;
  end: number;
}

export const parsePath = (d: string): Path => {
  let length = 0;
  const [move, ...rawCurves]: SVGPath = normalizeSVG(absSVG(parseSVG(d)));
  const curves: BezierCurve[] = rawCurves.map((curve, index) => {
    const prevCurve = rawCurves[index - 1];
    const from =
      index === 0
        ? { x: move[1], y: move[2] }
        : { x: prevCurve[5], y: prevCurve[6] };
    const c1 = { x: curve[1], y: curve[2] };
    const c2 = { x: curve[3], y: curve[4] };
    const to = { x: curve[5], y: curve[6] };
    const start = length;
    length += cubicBezierLength(from, c1, c2, to);
    const end = length;
    return {
      from,
      c1,
      c2,
      to,
      start,
      end,
    };
  });
  return {
    length,
    curves,
  };
};

export const serializePath = (path: Path) =>
  path.curves
    .map(
      (c, index) =>
        `${index === 0 ? `M${c.from.x},${c.from.y}` : ""}C${c.c1.x},${c.c1.y},${
          c.c2.x
        },${c.c2.y},${c.to.x},${c.to.y}`
    )
    .join("");

export const getPointAtLength = (path, length) => {
  "worklet";
  const { start, end, from, to, c1, c2 } = path.curves.find(
    (c) => length >= c.start && length <= c.end
  );
  const t = (length - start) / (end - start);
  return {
    x: cubicBezier(t, from.x, c1.x, c2.x, to.x),
    y: cubicBezier(t, from.y, c1.y, c2.y, to.y),
  };
};
