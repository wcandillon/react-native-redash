# Math

## `bin()`

```ts
const bin: (value: boolean) => 0 | 1
```

Convert a boolean value into a number. This can be useful in reanimated since 0 and 1 are used for conditional statements.

## `toRad()`

```ts
const toRad = (deg: number) => number;
```

Transforms an angle from degrees to radians.

## `toDeg()`

```ts
const toDeg = (rad: number) => number;
```

Transforms an angle from radians to degrees.

## `clamp()`

```ts
const clamp = (value: number, lowerBound: number, upperBound: number) => number;
```

Clamps a node with a lower and upper bound.

```ts
clamp(-1, 0, 100); // 0
clamp(1, 0, 100); // 1
clamp(101, 0, 100); // 100
```

## `between()`

```ts
const between = (value: number, lowerBound: number, upperBound: number, inclusive?: boolean) => boolean;
```

Returns true if node is within lowerBound and upperBound.

## `round()`

```ts
const round = (value: Animated.Adaptable<number>, precision: Animated.Adaptable<number> = 0) => Animated.Node<number>;
```

Computes animation node rounded to precision.

## `cubicBezier()`

```ts
const cubicBezier = (t: number, p0: number, p1: number, p2: number, p3: number) => number;
```

Returns the coordinate of a cubic bezier curve. t is the length of the curve from 0 to 1. `cubicBezier(0, p0, p1, p2, p3)` equals `p0` and `cubicBezier(1, p0, p1, p2, p3)` equals `p3`. `p0` and `p3` are respectively the starting and ending point of the curve. `p1` and `p2` are the control points.