# Animations

Animations in Reanimated v2 have powerful composability built-in. The following are functions TypeScript types that will help you to build custom animations.

# Higher-order Animations

Higher-order animations are a powerful concept in Reanimated v2. Here is an example.

## `defineAnimation()`

This utility function enables you to declare custom animations that can be invoked on both the JS and UI thread.  

```ts
const withCustomAnimation = () => {
  "worklet";
  return defineAnimation(() => {
    "worklet";
    // ...animation code
    return {
      animation,
      start
    }
  });
}
```

## `animationParameter(animation)`

Access animations passed as parameters safely on both the UI and JS thread with the proper static types. Animations can receive other animations as parameter.

```ts
export const withPause = (
  animationParam: AnimationParameter,
  paused: Animated.SharedValue<boolean>
) => {
  "worklet";
  return defineAnimation<PausableAnimation>(() => {
    "worklet";
    // Access the animation passed as parameter safely at runtime
    // with the proper TypeScript types
    const nextAnimation = animationParameter(animationParam);
    // ...animation code
```


## `withPause()`

Make an animation pausable. The state of the animation (paused or not) is controlled by a boolean shared value.

```ts
const progress = useSharedValue(0);
const paused = useSharedValue(false);
useEffect(() => {
  progress.value = withPause(withLoop(withTiming(1)), paused);
}, []);
```

## `withBouncing()`

Add a bouncing behavior to a physics-based animation. An animation is defined as being physics-based if it contains a velocity in its state.

```ts
// will bounce if the animations hits the position 0 or 100
withBouncing(withDecay({ velocity }), 0, 100)
```
 