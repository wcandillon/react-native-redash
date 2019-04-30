# redash

[![CircleCI](https://circleci.com/gh/wcandillon/redash.svg?style=svg)](https://circleci.com/gh/wcandillon/redash)
[![npm version](https://badge.fury.io/js/react-native-redash.svg)](https://badge.fury.io/js/react-native-redash)

Utility library for React Native Reanimated.

## Usage

```sh
yarn add react-native-redash
```

```js
import {atan2} from "react-native-redash";

atan2(y, x)
```

## Math

### `toRad(node)`

Transforms an angle in degrees in radians.

```js
(deg: Node) => Node
```

### `toDeg(node)`

Transforms an angle in radians in degrees.

```js
toDeg(rad: Node) => Node
```

### `min(...nodes)`

Takes one or more nodes as an input and returns a minimum of all the node's values.
This is equivalent to `Animated.min` but with support for more than two parameters.

```js
min(...args: Node[]) => Node
```

### `max(...nodes)`

Takes one or more nodes as an input and returns a maximum of all the node's values.
This is equivalent to `Animated.min` but with support for more than two parameters.

```js
max(...args: Node[]) => Node
```

### `atan(node)`

Returns a arc-tangent of the value in radians of the given node.
We provide this function in case you are using a version of reanimated that doesn't ship `atan`.
Beware that this function is not as precise at `Math.atan()` nor `Animated.atan()`.

```js
atan(rad: Node<number>) => Node<number>
```

### `atan2(node)`

Returns the angle in the plane (in radians) between the positive x-axis and the ray from (0,0) to the point (x,y), `atan2(y,x)`. Beware that this function is not as precise at `Math.atan2()`.

```js
atan2(y: Node, x Node) => Node
```

## Animations

### `runTiming(clock, value, config)`

Convenience function to run a timing animation.

```js
runTiming(clock: Clock, value: Node, config: TimingConfig): Node
```

Example usage:

```js
const config = {
  duration: 10 * 1000,
  toValue: 1,
  easing: Easing.linear,
};
runTiming(clock, 0, config)
```

### `lookup(nodes, index, notFound)`

Returns the node from the list of nodes at the specified index. If not, it returns the notFound node.

```js
lookup(values: Node[], index: Node, notFound: Node) => Node
```

### `interpolateColors(node, inputRange, colors)`

Interpolate colors based on an animation value and its value range.

```js
interpolateColors(value: Node, inputRange: number[], colors: Colors)
```

Example Usage:

```js
interpolateColors(
  x,
  [0, 1],
  ["#C52B27", "#E1B044"]
)
```

### `getSnapPoint(point, velocity, points)`

Select a point based on a node value and its velocity.
Example usage:

```js
const snapPoints = [-width, 0, width];
runSpring(clock, x, getSnapPoint(x, velocityX, snapPoints))
```

## Transformations

### `translateZ`

Convert a translateZ transformation into a scale transformation.

```js
translateZ(perspective: Node, z: Node)
```

Example usage with `transform`.

```js
const perspective = 800;
const z = new Value(100);
//...
transform: [
  { perspective },
  translateZ(perspective, z)
]
```

## Gestures

### `onScroll({ x: node, y: node })`

Returns a reanimated event handler for the ScrollView.

```js
onScroll(contentOffset: { x?: Node; y?: Node; }) => EventNode
```

Example usage for a vertical `ScrollView`.

```js
<Animated.ScrollView
  onScroll={onScroll({ y: new Value(0) })}
  vertical
/>
```

And for an horizontal one.

```js
<Animated.ScrollView
  onScroll={onScroll({ x: new Value(0) })}
  horizontal
/>
```
