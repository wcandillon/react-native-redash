export { processColor } from "react-native";

export enum Extrapolate {
  EXTEND = "extend",
  CLAMP = "clamp",
  IDENTITY = "identity",
}

export const interpolate = (
  v: number,
  inputRange,
  outputRange
) => {
  const [inS, inE] = [inputRange[0], inputRange[1]];
  const [outS, outE] = [outputRange[0], outputRange[1]];
  const value = (v);
  const progress = (value - inS) / (inE - inS);
  // logic below was made in order to provide a compatibility witn an Animated API
  const resultForNonZeroRange = outS + progress * (outE - outS);
  if (inS === inE) {
    if (value <= inS) {
      return outS;
    }
    return outE;
  }
  return resultForNonZeroRange;
};
