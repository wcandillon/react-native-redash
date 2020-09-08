import Animated from "react-native-reanimated";

declare let _WORKLET: boolean;

export interface AnimationState {
  current: number;
}

export interface PhysicsAnimationState extends AnimationState {
  velocity: number;
}

export type Animation<
  State extends AnimationState = AnimationState,
  PrevState = State
> = {
  animation: (animation: State, now: number) => boolean;
  start: (
    animation: State,
    value: number,
    now: number,
    lastAnimation: PrevState
  ) => void;
} & State;

export type AnimationParameter<State extends AnimationState = AnimationState> =
  | Animation<State>
  | (() => Animation<State>)
  | number;

export const animationParameter = <
  State extends AnimationState = AnimationState
>(
  animationParam: AnimationParameter<State>
) => {
  "worklet";
  if (typeof animationParam === "number") {
    throw new Error("Expected Animation as parameter");
  }
  return typeof animationParam === "function"
    ? animationParam()
    : animationParam;
};

export const defineAnimation = <
  S extends AnimationState = AnimationState,
  Prev extends AnimationState = AnimationState
>(
  factory: () => Omit<Animation<S, Prev>, keyof S>
) => {
  "worklet";
  if (_WORKLET) {
    return (factory() as unknown) as number;
  }
  return (factory as unknown) as number;
};

interface PausableAnimation extends AnimationState {
  lastTimestamp: number;
  elapsed: number;
}

export const withPause = (
  animationParam: AnimationParameter,
  paused: Animated.SharedValue<boolean>
) => {
  "worklet";
  return defineAnimation<PausableAnimation>(() => {
    "worklet";
    const nextAnimation = animationParameter(animationParam);
    const animation = (state: PausableAnimation, now: number) => {
      const { lastTimestamp, elapsed } = state;
      if (paused.value) {
        state.elapsed = now - lastTimestamp;
        return false;
      }
      const dt = now - elapsed;
      const finished = nextAnimation.animation(nextAnimation, dt);
      state.current = nextAnimation.current;
      state.lastTimestamp = dt;
      return finished;
    };
    const start = (
      state: PausableAnimation,
      value: number,
      now: number,
      previousState: AnimationState
    ) => {
      state.lastTimestamp = now;
      state.elapsed = 0;
      nextAnimation.start(nextAnimation, value, now, previousState);
    };
    return {
      animation,
      start,
    };
  });
};

export const withBouncing = (
  animationParam: AnimationParameter<PhysicsAnimationState>,
  lowerBound: number,
  upperBound: number
): number => {
  "worklet";
  return defineAnimation<PhysicsAnimationState, PhysicsAnimationState>(() => {
    "worklet";
    const nextAnimation = animationParameter(animationParam);
    const animation = (state: PhysicsAnimationState, now: number) => {
      const finished = nextAnimation.animation(nextAnimation, now);
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
    const start = (
      _state: PhysicsAnimationState,
      value: number,
      now: number,
      previousState: PhysicsAnimationState
    ) => {
      nextAnimation.start(nextAnimation, value, now, previousState);
    };
    return {
      animation,
      start,
    };
  });
};
