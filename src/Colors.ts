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
  Extrapolate
} = Animated;

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

function match(
  condsAndResPairs: readonly Animated.Node<number>[],
  offset = 0
): undefined | Animated.Node<number> {
  if (condsAndResPairs.length - offset === 1) {
    return condsAndResPairs[offset];
  }
  if (condsAndResPairs.length - offset === 0) {
    return undefined;
  }
  return cond(
    condsAndResPairs[offset],
    condsAndResPairs[offset + 1],
    match(condsAndResPairs, offset + 2)
  );
}

function colorHSV(
  h: Animated.Adaptable<number> /* 0 - 360 */,
  s: Animated.Adaptable<number> /* 0 - 1 */,
  v: Animated.Adaptable<number> /* 0 - 1 */
): Animated.Node<number> {
  // Converts color from HSV format into RGB
  // Formula explained here: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
  const c = multiply(v, s);
  const hh = divide(h, 60);
  const x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1))));

  const m = sub(v, c);

  const colorRGB = (
    r: Animated.Adaptable<number>,
    g: Animated.Adaptable<number>,
    b: Animated.Adaptable<number>
  ) =>
    color(
      round(multiply(255, add(r, m))),
      round(multiply(255, add(g, m))),
      round(multiply(255, add(b, m)))
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
    colorRGB(c, 0, x) /* else */
  ]) as Animated.Node<number>;
}

const rgbToHsv = (c: RGBColor) => {
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;

  const ma = Math.max(r, g, b);
  const mi = Math.min(r, g, b);
  let h = 0;
  const v = ma;

  const d = ma - mi;
  const s = ma === 0 ? 0 : d / ma;
  if (ma === mi) {
    h = 0; // achromatic
  } else {
    switch (ma) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default: // do nothing
    }
    h /= 6;
  }
  return { h: h * 360, s, v };
};

const interpolateColorsHSV = (
  animationValue: Animated.Adaptable<number>,
  inputRange: number[],
  colors: RGBColor[]
): Animated.Node<number> => {
  const colorsAsHSV = colors.map(c => rgbToHsv(c));
  const h = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.h),
    extrapolate: Extrapolate.CLAMP
  });
  const s = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.s),
    extrapolate: Extrapolate.CLAMP
  });
  const v = interpolate(animationValue, {
    inputRange,
    outputRange: colorsAsHSV.map(c => c.v),
    extrapolate: Extrapolate.CLAMP
  });
  return colorHSV(h, s, v);
};

const interpolateColorsRGB = (
  animationValue: Animated.Adaptable<number>,
  inputRange: number[],
  colors: RGBColor[]
) => {
  const r = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => c.r),
      extrapolate: Extrapolate.CLAMP
    })
  );
  const g = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => c.g),
      extrapolate: Extrapolate.CLAMP
    })
  );
  const b = round(
    interpolate(animationValue, {
      inputRange,
      outputRange: colors.map(c => c.b),
      extrapolate: Extrapolate.CLAMP
    })
  );
  return color(r, g, b);
};

interface ColorInterpolationConfig {
  inputRange: number[];
  outputRange: RGBColor[];
}

export const interpolateColor = (
  value: Animated.Adaptable<number>,
  config: ColorInterpolationConfig,
  colorSpace: "hsv" | "rgb" = "rgb"
): Animated.Node<number> => {
  const { inputRange, outputRange } = config;
  if (colorSpace === "hsv")
    return interpolateColorsHSV(value, inputRange, outputRange);
  return interpolateColorsRGB(value, inputRange, outputRange);
};

export const bInterpolateColor = (
  value: Animated.Adaptable<number>,
  color1: RGBColor,
  color2: RGBColor,
  colorSpace: "hsv" | "rgb" = "rgb"
) =>
  interpolateColor(
    value,
    {
      inputRange: [0, 1],
      outputRange: [color1, color2]
    },
    colorSpace
  );
