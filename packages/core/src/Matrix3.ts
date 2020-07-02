export type Vec3 = readonly [number, number, number];

export type Matrix3 = readonly [Vec3, Vec3, Vec3];

type Transform2dName =
  | "translateX"
  | "translateY"
  | "scale"
  | "skewX"
  | "skewY"
  | "scaleX"
  | "scaleY"
  | "rotateZ"
  | "rotate";

type Transformations = {
  [Name in Transform2dName]: number;
};

export type Transforms2d = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "skewX">
  | Pick<Transformations, "skewY">
  | Pick<Transformations, "rotateZ">
  | Pick<Transformations, "rotate">
)[];
