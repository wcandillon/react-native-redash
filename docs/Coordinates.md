# Coordinates

When doing animation you often need to use a polar or coordinate system. However, React Native uses a canvas coordinate system. These functions will help you to seamlessly go back and forth.

## `canvas2Cartesian()`

```ts
canvas2Cartesian: ({ x, y }: Vector, center: Vector) => Vector;
```

## `cartesian2Canvas()`

```ts
export declare const cartesian2Canvas: ({ x, y }: Vector, center: Vector) => Vector;
```

## `cartesian2Polar()`

```ts
export declare const cartesian2Polar: ({ x, y }: Vector, center: Vector) => { radius: number, theta: number };
```

## `polar2Cartesian()`

```ts
export declare const polar2Cartesian: ({ theta, radius }: PolarPoint) => Vector;
```

## `polar2Canvas()`

```ts
export declare const polar2Canvas: ({ theta, radius }: PolarPoint, center: Vector) => Vector;
```

## `canvas2Polar()`

```ts
export declare const canvas2Polar: ({ x, y }: Vector, center: Vector) => {
    theta: number;
    radius: number;
};
```