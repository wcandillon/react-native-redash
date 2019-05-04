import Animated from "react-native-reanimated";

const {
  cond,
  add,
  multiply,
  lessThan,
  abs,
  modulo,
  round,
  interpolate,
  divide,
  sub,
  color,
  Extrapolate,
  Node,
} = Animated;

type Node = ReturnType<typeof add>;
type Adaptable<T> = Node | T;

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

function match(condsAndResPairs: Adaptable<number>[], offset = 0): any {
  if (condsAndResPairs.length - offset === 1) {
    return condsAndResPairs[offset];
  } if (condsAndResPairs.length - offset === 0) {
    return undefined;
  }
  return cond(
    condsAndResPairs[offset],
    condsAndResPairs[offset + 1],
    match(condsAndResPairs, offset + 2),
  );
}

function colorHSV(
  h: Adaptable<number> /* 0 - 360 */,
  s: Adaptable<number> /* 0 - 1 */,
  v: Adaptable<number>, /* 0 - 1 */
) {
  // Converts color from HSV format into RGB
  // Formula explained here: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
  const c = multiply(v, s);
  const hh = divide(h, 60);
  const x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1))));

  const m = sub(v, c);

  const colorRGB = (r: Adaptable<number>, g: Adaptable<number>, b: Adaptable<number>) => color(
    round(multiply(255, add(r, m))),
    round(multiply(255, add(g, m))),
    round(multiply(255, add(b, m))),
  );

  return match([
    lessThan(h, 60),
    colorRGB(c, x, 0),
    lessThan(h, 120),
    colorRGB(x, c, 0),
    lessThan(h, 180),
    colorRGB(0, c, x),
    lessThan(h, 240),
    colorRGB(0, x, c),
    lessThan(h, 300),
    colorRGB(x, 0, c),
    colorRGB(c, 0, x) /* else */,
  ]);
}

const rgbToHsv = (c: RGBColor) => {
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;

  const ma = Math.max(r, g, b);
  const mi = Math.min(r, g, b);
  let h: number = 0;
  const v = ma;

  const d = ma - mi;
  const s = ma === 0 ? 0 : d / ma;
  if (ma === mi) {
    h = 0; // achromatic
  } else {
    switch (ma) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
    default: // do nothing
    }
    h /= 6;
  }
  return { h: h * 360, s, v };
};

const interpolateColors = (animationValue: Adaptable<number>, inputRange: number[], colors: RGBColor[]) => {
  const colorsAsHSV = colors.map(c => rgbToHsv(c));
  const h = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.h),
    extrapolate: Extrapolate.CLAMP,
  });
  const s = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.s),
    extrapolate: Extrapolate.CLAMP,
  });
  const v = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.v),
    extrapolate: Extrapolate.CLAMP,
  });
  return colorHSV(h, s, v);
};

export default interpolateColors;
