/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { AnimatableValue, Animation } from "react-native-reanimated";
import Animated, { defineAnimation } from "react-native-reanimated";

interface PausableAnimation extends Animation<PausableAnimation> {
  lastTimestamp: number;
  elapsed: number;
}

export const withPause = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _nextAnimation: any,
  paused: Animated.SharedValue<boolean>
) => {
  "worklet";
  return defineAnimation<PausableAnimation>(_nextAnimation, () => {
    "worklet";
    const nextAnimation: PausableAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;
    const onFrame = (state: PausableAnimation, now: number) => {
      const { lastTimestamp, elapsed } = state;
      if (paused.value) {
        state.elapsed = now - lastTimestamp;
        return false;
      }
      const dt = now - elapsed;
      const finished = nextAnimation.onFrame(nextAnimation, dt);
      state.current = nextAnimation.current;
      state.lastTimestamp = dt;
      return finished;
    };
    const onStart = (
      state: PausableAnimation,
      value: AnimatableValue,
      now: number,
      previousState: PausableAnimation
    ) => {
      state.lastTimestamp = now;
      state.elapsed = 0;
      state.current = 0;
      nextAnimation.onStart(nextAnimation, value, now, previousState);
    };
    const callback = (finished?: boolean): void => {
      if (nextAnimation.callback) {
        nextAnimation.callback(finished);
      }
    };
    return {
      onFrame,
      onStart,
      isHigherOrder: true,
      current: nextAnimation.current,
      callback,
      previousAnimation: null,
      startTime: 0,
      started: false,
      lastTimestamp: 0,
      elapsed: 0,
    };
  });
};

export interface PhysicsAnimation extends Animation<PhysicsAnimation> {
  velocity: number;
  current: number;
}

/**
 *  @summary Add a bouncing behavior to a physics-based animation.
 *  An animation is defined as being physics-based if it contains a velocity in its state.
 *  @example
    // will bounce if the animations hits the position 0 or 100
    withBouncing(withDecay({ velocity }), 0, 100)
 * @worklet
 */
export const withBouncing = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _nextAnimation: any,
  lowerBound: number,
  upperBound: number
): number => {
  "worklet";
  return defineAnimation<PhysicsAnimation>(_nextAnimation, () => {
    "worklet";

    const nextAnimation: PhysicsAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;

    const onFrame = (state: PhysicsAnimation, now: number) => {
      const finished = nextAnimation.onFrame(nextAnimation, now);
      const { velocity, current } = nextAnimation;
      state.current = current;
      if (
        (velocity < 0 && state.current <= lowerBound) ||
        (velocity > 0 && state.current >= upperBound)
      ) {
        state.current = velocity < 0 ? lowerBound : upperBound;
        nextAnimation.velocity *= -0.5;
      }
      return finished;
    };
    const onStart = (
      _state: PhysicsAnimation,
      value: number,
      now: number,
      previousState: PhysicsAnimation
    ) => {
      nextAnimation.onStart(nextAnimation, value, now, previousState);
    };
    return {
      onFrame,
      onStart,
      current: nextAnimation.current,
      callback: nextAnimation.callback,
      velocity: 0,
    };
  });
};
