# redash

[![CircleCI](https://circleci.com/gh/wcandillon/react-native-redash.svg?style=svg)](https://circleci.com/gh/wcandillon/react-native-redash)
[![npm version](https://badge.fury.io/js/react-native-redash.svg)](https://badge.fury.io/js/react-native-redash)

Utility library for React Native Gesture Handler and Reanimated. As seen on the [“Can it be done in React Native?”](http://youtube.com/user/wcandill) YouTube series.

## Usage

```sh
yarn add react-native-redash
```

```js
import { atan2 } from "react-native-redash";

atan2(y, x);
```

## Components

### `<ReText>`

Component that displays an animation value as text.

Example usage:

```js
<ReText text={new Value("hello world!")} style={{ color: "blue" }} />
```

## SVG

### `parsePath(SVGPath: String): ReanimatedPath`

Given an SVG Path, returns a denormalized object of values that can be used for animations on that path.
From the perspective of the user, the returned value should be considered a black box.
Here is an example below:

```ts
// We get the data from the SVG Path denormalized a way that can be handled with Reanimated
const path = parsePath(d);
const { y, x } = getPointAtLength(path, length);
```

### `getPointAtLength(path): { x: Node, y: Node }`

Implementation of [getPointAtLength](https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getPointAtLength) for Reanimated.

```ts
// We get the data from the SVG Path denormalized a way that can be handled with Reanimated
const path = parsePath(d);
const { y, x } = getPointAtLength(path, length);
```

### `interpolatePath(value: Node, { inputRange, outputRange }): path`

Interpolate from one SVG point to the other, this function assumes that each path has the same number of points.

```tsx
const phone1 = "M 18 149C 18 149 25 149 25 149 25 14...";
const d = interpolatePath(slider, {
  inputRange: [0, width, width * 2],
  outputRange: [phone1, phone2, phone3]
});
return (
  <Svg style={styles.svg} viewBox="0 0 100 300">
    <AnimatedPath fill="black" {...{ d }} />
  </Svg>
);
```

### `bInterpolatePath(progress, path1, path2): path`

Interpolate from one SVG point to the other, this function assumes that each path has the same number of points.

```tsx
const rhino = "M 217.765 29.683 C 225.855 29.683 ";
const elephant = "M 223.174 43.413 ...";
return (
  <>
    <Animated.Code>
      {() =>
        set(
          progress,
          timing(clock, progress, {
            to: 1,
            duration: 2000,
            easing: Easing.linear
          })
        )
      }
    </Animated.Code>
    <Svg style={styles.container} viewBox="0 0 409 280">
      <AnimatedPath
        d={bInterpolatePath(progress, rhino, elephant)}
        fill="#7d8f9b"
      />
    </Svg>
  </>
);
```

### `getLengthAtX(path: ReanimatedPath, x: Node): Node`

Convenience function for bezier curves where there is really only ever one "y" value associated with one "x" value.
This function works by finding the roots of the cubic bezier curve so it might be too compute-intensive to calculate for each frame.

## Math

### `toRad(node: Node): Node`

Transforms an angle from degrees to radians.

```js
(deg: Node) => Node;
```

### `toDeg(node: Node): Node`

Transforms an angle from radians to degrees.

```js
toDeg(rad: Node) => Node
```

### `min(...nodes: Node[]): Node`

Takes one or more nodes as input and returns the minimum of all the node's values.
This is equivalent to `Animated.min` but with support for more than two parameters.

```js
min(...args: Node[]) => Node
```

### `max(...nodes: Node[]): Node`

Takes one or more nodes as input and returns the maximum of all the node's values.
This is equivalent to `Animated.min` but with support for more than two parameters.

```js
max(...args: Node[]) => Node
```

### `clamp(node: Node, lowerBound: Adaptable, upperBound: Adaptable)`

Clamps a node with a lower and upper bound.

```js
clamp(new Value(-1), 0, 100); // 0
clamp(new Value(1), 0, 100); // 1
clamp(new Value(101), 0, 100); // 100
```

###  between = (node: Node, lowerBound: Adaptable, upperBound: Adaptable, inclusive: boolean)

Returns true if `node` is within `lowerBound` and `upperBound`.

### `approximates(value: Node, approximatesTo: Node, precision = 0.001): number`

Returns 1 if the difference between the two values is less than precision.
Otherwise returns 0.
Default value for the precision is 0.001.

### `atan(node: Node): Node`

Returns the arc-tangent of the value in radians of the given node.
We provide this function in case you are using a version of reanimated that doesn't ship `atan`.
Beware that this function is not as precise at `Math.atan()` nor `Animated.atan()`.

```js
atan(rad: Node) => Node
```

### `atan2(node: Node): Node`

Returns the angle in the plane (in radians) between the positive x-axis and the ray from (0,0) to the point (x,y), `atan2(y,x)`.

```js
atan2(y: Node, x Node) => Node
```

### `acos(node: Node): Node`

Returns the arc-cosine of the value in radians of the given node.
We provide this function in case you are using a version of reanimated that doesn't ship `acos`.

```js
acos(y: Node, x Node) => Node
```

### `asin(node: Node): Node`

Returns the arc-sinus of the value in radians of the given node.
We provide this function in case you are using a version of reanimated that doesn't ship `cos`.

```js
asin(y: Node, x Node) => Node
```

### `cubicBezier(t: Node, p0: Node, p1: Node, p2: Node, p3: Node): Node`

Returns the coordinate of a cubic bezier curve.
`t` is the length of the curve from 0 to 1. `cubicBezier(0, p0, p1, p2, p3)` equals `p0` and `cubicBezier(1, p0, p1, p2, p3)` equals `p3`.
`p0` and `p3` are respectively the starting and ending point of the curve.
`p1` and `p2` are the control points.

## String

### `string`

Tagged template for animated string values.

```tsx
const { x, y } = { x: new Value(0), y: new Value(0) };
const d = string`M0,0 ${x},${y}`;
return <AnimatedPath {...{ d }} />;
```

## Array

### `get(nodes: Adaptable[], index:Adaptable, notFound: Node): Node`

Returns the node from the list of nodes at the specified index. If not, it returns the notFound node.

```js
get(values: Node[], index: Node, notFound: Node) => Node
```

### `find(nodes: Node[], predicate: (v: Node) => Node, notFound: Node): Node`

Iterates over the node's list, returning the first element predicate returns true for. The predicate is invoked with the value argument.

```js
find(values: Node[], predicate: (Node) => Node, notFound: Node) => Node
```

### `contains(nodes: Node[], value: Node) : number`

Returns 1 if the node's value is contained in the array of nodes, 0 otherwise.

```js
contains(values: Node[], value: Node) => Node
```

## Animations

### `useTransition(state: any, source: Node, destination: Node, duration: number, easing: EasingFunction): Node`

Returns an animation value that follows a component state.
The value equals `source` at the beginning of the transition and `destination` at the end of the transition.

### `useToggle(toggle: boolean, duration: number, easing: EasingFunction): Node`

Returns an animation value that follows a component boolean state.

### `timing({ clock?: Clock, from?: Node, to?: Node, duration?: Node, easing?: EasingFunction }): Node`

Convenience function to run a timing animation.

Example usage:

```js
timing({
  duration: 10 * 1000,
  from: 0
  to: 1,
  easing: Easing.linear,
});
```

### `loop({ clock: Clock, duration: Node, easing: EasingFunction: boomerang? = false, autoStart? = true })`

Returns an animated node that goes from `0` to `1` during the time set by `duration` continuously. If the `boomerang` option is set to `true`, the animation goes from `0` to `1` and then from `1` to `0` in the next cycle.

Example usage:

```js
const progress = new Value(0);
set(progress, runLoop(400, Easing.linear);
```

### `delay(node: Node, duration: number)`

Evaluate an animation node after a certain amount of time. `duration` is in milliseconds.

Example usage:

```js
delay(set(value, 1), 250);
```

### `decay({ clock: Clock, value: Node, velocity: Node, deceleration: number} ): Node`

Convenience function to run a decay animation.

```js
decay({ clock: Clock, value: Node, velocity: Node, deceleration: number} ): Node
```

### `spring({ clock: Clock, value: Node, velocity: Node, deceleration: number} ): Node`

Convenience function to run a spring animation.

```tsx
spring({ clock?: Clock, from?: Node, velocity?: number, config?: SpringConfig, to?: Node }): Node
```

### `toggle({ toggleState: Value, clock?: Clock, from?: Node, to?: Node, duration?: Node, easing?: EasingFunction }): Node`

Convenience function to imperatively toggle animation.

Example usage:

```tsx
const toggleState = new Value(State.END);

const handleToggleButtonPress = (shouldOpen: boolean) => {
  shouldOpen ? toggleState.setValue(1) : toggleState.setValue(0);
};

useCode(
  block([
    toggle({
      clock: Clock,
      value: Node,
      toggleState: Value(State.END),
      easing: EasingFunction,
      duration: number,
      from: Node,
      to: Node
    })
  ]),
  []
);
```

### `bInterpolate(node: Node, from: Node, to: Node): Node`

Interpolate the node from 0 to 1 without clamping.

### `interpolateColor(node: Node, { inputRange, outputRange }: ColorInterpolationConfig, [colorSpace = "rgb"]): Node`

Interpolate colors based on an animation value and its value range.

```js
interpolateColor(value: Node, { inputRange: number[], outputRange: Colors }, colorSpace?: "hsv" | "rgb"): Node
```

Example Usage:

```js
const from = {
  r: 197,
  g: 43,
  b: 39
};
const to = {
  r: 225,
  g: 176,
  b: 68
};

// Interpolate in default color space (HSV)
interpolateColor(x, [0, 1], [from, to]);

// Interpolate in RGB color space
interpolateColor(x, [0, 1], [from, to], "rgb");
```

### `bInterpolateColor(node, color1, color2, [colorSpace = "rgb"])`

Interpolate the node from 0 to 1 without clamping.

### `snapPoint(point, velocity, points)`

Select a point based on a node value and its velocity.

### `moving(point, minPositionDelta = 1e-3, emptyFrameThreshold = 5)`

Returns true when the animation node stopped updating within `emptyFrameThreshold` frames.
This function can be useful to detect if an animation is over.

## Transformations

### `translateZ(prespective, z)`

Convert a translateZ transformation into a scale transformation.

```js
translateZ(perspective: Node, z: Node)
```

### `transformOrigin(x, y, transformations)`

Changes the origin of the transformations.

```js
transformOrigin(x: Node, y: Node, transformations: AnimatedTransform): Node[]
```

Example:

```jsx
<View
  style={{
    transform: transformOrigin(cx, cy, { rotateX })
  }}
/>
```

Example usage with `transform`.

```js
const perspective = 800;
const z = new Value(100);
//...
transform: [{ perspective }, translateZ(perspective, z)];
```

## Gestures

### `onScroll({ x: Node, y: Node }): EventNode`

Returns a reanimated event handler for the ScrollView.

```js
onScroll(contentOffset: { x?: Node; y?: Node; }) => EventNode
```

Example usage for a vertical `ScrollView`.

```js
<Animated.ScrollView onScroll={onScroll({ y: new Value(0) })} vertical />
```

And for a horizontal one.

```js
<Animated.ScrollView onScroll={onScroll({ x: new Value(0) })} horizontal />
```

### `onGestureEvent(nativeEvent)`

Returns a reanimated event handler for any Gesture handler event handler.

Example usage for a vertical `PanGestureHandler`.

```js
const translationX = new Value(0);
const state = new Value(State.UNDETERMINED);
const gestureEvent = onGestureEvent({ translationX, state });
return <PanGestureHandler {...gestureEvent} />;
```

### `panGestureHandler()`

```tsx
const {
  gestureEvent,
  state
  translationX,
  velocityX,
  translationY,
  velocityY
} = panGestureHandler();
return (
  <PanGestureHandler {...gestureEvent} />
);
```

### `horizontalPanGestureHandler()`

```tsx
const {
  gestureEvent,
  state
  translationX,
  velocityX,
} = horizontalPanGestureHandler();
return (
  <PanGestureHandler {...gestureEvent} />
);
```

### `verticalPanGestureHandler()`

```tsx
const {
  gestureEvent,
  state
  translationY,
  velocityY,
} = verticalPanGestureHandler();
return (
  <PanGestureHandler {...gestureEvent} />
);
```

### `panGestureHandler()`

```tsx
const { gestureEvent, translationX, translationY } = panGestureHandler();
return <PanGestureHandler {...gestureEvent} />;
```

### `withSpring({ value: Node, velocity: Node, state: Value, offset: Node, config, snapPoints: Node[], onSnap: (value) => void }): Node`

Decorates animated value to spring when the gesture ends.

```js
const translateX = withSpring({
  value: translationX,
  velocity: velocityX,
  state,
  snapPoints,
  onSnap
});
```

### `withDecay({ value: Node, velocity: Node, state: Value, offset: Node, deceleration }): Node`

Decorates animated value to decay when the gesture ends.

```js
const translateX = withDecay({
  value: translationX,
  velocity: velocityX,
  state: gestureState,
  offset: offsetX
});
```

### `withOffset(value: Node, state: Node, offset: Node = 0): Node`

Decorates animated value to save previous offset of pan

```js
constructor(props) {
  const dragX = new Value(0);
  const panState = new Value(0);

  this.handlePan = event([
    {
      nativeEvent: {
        translationX: dragX,
        state: panState,
      },
    },
  ]);

  this.X = withOffset(dragX, panState);
}
```

### `preserveMultiplicativeOffset(value: Node, state: Node): Node`

Decorates animated value to save previous offset of pinch

```js
constructor(props) {
  const scale = new Value(1);
  const scaleState = new Value(0);

  this.handleZoom = event([
    {
      nativeEvent: {
        scale,
        state: panState,
      },
    },
  ]);

  this.X = preserveMultiplicativeOffset(scale, scaleState);
}
```

### `spring( translation: Node, state: Node, snapPoint: Node, defaultOffset = 0, springConfig?): Node`

Decorates animated value to spring after pan

```js
constructor(props) {
  const dragX = new Value(0);
  const panState = new Value(0);
  const snapPoint = new Value(100);

  this.handlePan = event([
    {
      nativeEvent: {
        state: panState,
        velocityX,
      },
    },
  ]);

  this.X = spring(dragX, panState, snapPoint);
}
```
