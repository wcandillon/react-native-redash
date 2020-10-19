import Animated, { interpolate } from "react-native-reanimated";
import parseSVG from "parse-svg-path";
import absSVG from "abs-svg-path";
import normalizeSVG from "normalize-svg-path";

import { Vector } from "./Vectors";
import { cubicBezierYForX } from "./Math";

type SVGCloseCommand = ["Z"];
type SVGMoveCommand = ["M", number, number];
type SVGCurveCommand = ["C", number, number, number, number, number, number];
type SVGNormalizedCommands = [
  SVGMoveCommand,
  ...(SVGCurveCommand | SVGCloseCommand)[]
];

interface Curve {
  to: Vector;
  c1: Vector;
  c2: Vector;
}

export type Path = {
  move: Vector;
  curves: Curve[];
  close: boolean;
};

const serializeCurve = (c: Curve) => {
  "worklet";
  return `C${c.c1.x},${c.c1.y} ${c.c2.x},${c.c2.y} ${c.to.x},${c.to.y} `;
};

/**
 * @summary Serialize a path into an SVG path string
 */
export const serialize = (path: Path) => {
  "worklet";
  return `M${path.move.x},${path.move.y} ${path.curves
    .map(serializeCurve)
    .reduce((acc, c) => acc + c)}${path.close ? "Z" : ""}`;
};

/**
 * @description ⚠️ this function cannot run on the UI thread. It must be executed on the JS thread
 * @summary Parse an SVG path into a sequence of Bèzier curves.
 * The SVG is normalized to have absolute values and to be approximated to a sequence of Bèzier curves.
 */
export const parse = (d: string): Path => {
  const segments: SVGNormalizedCommands = normalizeSVG(absSVG(parseSVG(d)));
  const path = createPath({ x: segments[0][1], y: segments[0][2] });
  segments.forEach((segment) => {
    if (segment[0] === "Z") {
      close(path);
    } else if (segment[0] === "C") {
      curve(path, {
        c1: {
          x: segment[1],
          y: segment[2],
        },
        c2: {
          x: segment[3],
          y: segment[4],
        },
        to: {
          x: segment[5],
          y: segment[6],
        },
      });
    }
  });
  return path;
};

/**
 * @summary Interpolate between paths.
 */
export const interpolatePath = (
  value: number,
  inputRange: number[],
  outputRange: Path[],
  extrapolate = Animated.Extrapolate.CLAMP
) => {
  "worklet";
  const path = {
    move: {
      x: interpolate(
        value,
        inputRange,
        outputRange.map((p) => p.move.x),
        extrapolate
      ),
      y: interpolate(
        value,
        inputRange,
        outputRange.map((p) => p.move.y),
        extrapolate
      ),
    },
    curves: outputRange[0].curves.map((_, index) => ({
      c1: {
        x: interpolate(
          value,
          inputRange,
          outputRange.map((p) => p.curves[index].c1.x),
          extrapolate
        ),
        y: interpolate(
          value,
          inputRange,
          outputRange.map((p) => p.curves[index].c1.y),
          extrapolate
        ),
      },
      c2: {
        x: interpolate(
          value,
          inputRange,
          outputRange.map((p) => p.curves[index].c2.x),
          extrapolate
        ),
        y: interpolate(
          value,
          inputRange,
          outputRange.map((p) => p.curves[index].c2.y),
          extrapolate
        ),
      },
      to: {
        x: interpolate(
          value,
          inputRange,
          outputRange.map((p) => p.curves[index].to.x),
          extrapolate
        ),
        y: interpolate(
          value,
          inputRange,
          outputRange.map((p) => p.curves[index].to.y),
          extrapolate
        ),
      },
    })),
    close: outputRange[0].close,
  };
  return serialize(path);
};

/**
 * @summary Interpolate two paths with an animation value that goes from 0 to 1
 */
export const mixPath = (
  value: number,
  p1: Path,
  p2: Path,
  extrapolate = Animated.Extrapolate.CLAMP
) => {
  "worklet";
  return interpolatePath(value, [0, 1], [p1, p2], extrapolate);
};

/**
 * @summary Returns a Path
 */
export const createPath = (move: Vector): Path => {
  "worklet";
  return {
    move,
    curves: [],
    close: false,
  };
};

/**
 * @summary Returns a Bèzier curve command
 */
export const curve = (path: Path, c: Curve) => {
  "worklet";
  path.curves.push({
    c1: c.c1,
    c2: c.c2,
    to: c.to,
  });
};

/**
 * @summary Returns a close command.
 */
export const close = (path: Path) => {
  "worklet";
  path.close = true;
};

interface SelectedCurve {
  from: Vector;
  curve: Curve;
}

interface NullableSelectedCurve {
  from: Vector;
  curve: Curve | null;
}

const curveIsFound = (c: NullableSelectedCurve): c is SelectedCurve => {
  "worklet";
  return c.curve !== null;
};

/**
 * @summary Return the curves at x. This function assumes that only one curve is available at x
 */
export const selectCurve = (path: Path, x: number): SelectedCurve => {
  "worklet";
  const result: NullableSelectedCurve = {
    from: path.move,
    curve: null,
  };
  for (let i = 0; i < path.curves.length; i++) {
    const c = path.curves[i];
    const contains =
      result.from.x > c.to.x
        ? x >= c.to.x && x <= result.from.x
        : x >= result.from.x && x <= c.to.x;
    if (contains) {
      result.curve = c;
      break;
    }
    result.from = c.to;
  }
  if (!curveIsFound(result)) {
    throw new Error(`No curve found at ${x}`);
  }
  return result;
};

/**
 * @summary Return the y value of a path given its x coordinate
 * @example
    const p1 = parse(
      "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150"
    );
    // 75
    getYForX(p1, 200))
    // ~151
    getYForX(p1, 50)
 */
export const getYForX = (path: Path, x: number, precision = 2) => {
  "worklet";
  const c = selectCurve(path, x);
  return cubicBezierYForX(
    x,
    c.from,
    c.curve.c1,
    c.curve.c2,
    c.curve.to,
    precision
  );
};
