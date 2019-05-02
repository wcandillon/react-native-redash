/* eslint-disable react/sort-comp */
import React from "react";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { StyleProp, ViewStyle } from "react-native";

const {
  add,
  cond,
  diff,
  divide,
  eq,
  event,
  exp,
  lessThan,
  and,
  call,
  block,
  multiply,
  pow,
  set,
  abs,
  clockRunning,
  greaterOrEq,
  lessOrEq,
  sqrt,
  startClock,
  stopClock,
  sub,
  Clock,
  Value,
} = Animated;

export { add };
export type Node = ReturnType<typeof add>;
export type Adaptable<T> = Node | T;

const ANIMATOR_PAUSE_CONSECUTIVE_FRAMES = 10;
const ANIMATOR_PAUSE_ZERO_VELOCITY = 1;
const DEFAULT_SNAP_TENSION = 300;
const DEFAULT_SNAP_DAMPING = 0.7;
const DEFAULT_GRAVITY_STRENGTH = 400;
const DEFAULT_GRAVITY_FALLOF = 40;

function sq(x: any) {
  return multiply(x, x);
}

function influenceAreaWithRadius(radius: number, anchor: any) {
  return {
    left: (anchor.x || 0) - radius,
    right: (anchor.x || 0) + radius,
    top: (anchor.y || 0) - radius,
    bottom: (anchor.y || 0) + radius,
  };
}

function snapTo(target: any, snapPoints: any, best: any, clb: any, dragClb: any) {
  const dist = new Value(0);
  const snap = (pt: any) => [
    set(best.tension, pt.tension || DEFAULT_SNAP_TENSION),
    set(best.damping, pt.damping || DEFAULT_SNAP_DAMPING),
    set(best.x, pt.x || 0),
    set(best.y, pt.y || 0),
  ];
  const snapDist = (pt: any) => add(sq(sub(target.x, pt.x || 0)), sq(sub(target.y, pt.y || 0)));
  return [
    set(dist, snapDist(snapPoints[0])),
    ...snap(snapPoints[0]),
    ...snapPoints.map((pt: any) => {
      const newDist = snapDist(pt);
      return cond(lessThan(newDist, dist), [set(dist, newDist), ...snap(pt)]);
    }),
    (clb || dragClb)
      && call([best.x, best.y, target.x, target.y], ([bx, by, x, y]) => {
        snapPoints.forEach((pt: any, index: number) => {
          if (
            (pt.x === undefined || pt.x === bx)
            && (pt.y === undefined || pt.y === by)
          ) {
            if (clb) {
              clb({ nativeEvent: { ...pt, index } });
            }
            if (dragClb) {
              dragClb({
                nativeEvent: {
                  x, y, targetSnapPointId: pt.id, state: "end",
                },
              });
            }
          }
        });
      }),
  ];
}

function springBehavior(dt: any, target: any, obj: any, anchor: any, tension: number = 300) {
  const dx = sub(target.x, anchor.x);
  const ax = divide(multiply(-1, tension, dx), obj.mass);
  const dy = sub(target.y, anchor.y);
  const ay = divide(multiply(-1, tension, dy), obj.mass);
  return {
    x: set(obj.vx, add(obj.vx, multiply(dt, ax))),
    y: set(obj.vy, add(obj.vy, multiply(dt, ay))),
  };
}

function frictionBehavior(dt: any, obj: any, damping: number = 0.7) {
  const friction = pow(damping, multiply(60, dt));
  return {
    x: set(obj.vx, multiply(obj.vx, friction)),
    y: set(obj.vy, multiply(obj.vy, friction)),
  };
}

function anchorBehavior(dt: any, target: any, obj: any, anchor: any) {
  const dx = sub(anchor.x, target.x);
  const dy = sub(anchor.y, target.y);
  return {
    x: set(obj.vx, divide(dx, dt)),
    y: set(obj.vy, divide(dy, dt)),
  };
}

function gravityBehavior(
  dt: any,
  target: any,
  obj: any,
  anchor: any,
  strength: number = DEFAULT_GRAVITY_STRENGTH,
  falloff: number = DEFAULT_GRAVITY_FALLOF,
) {
  const dx = sub(target.x, anchor.x);
  const dy = sub(target.y, anchor.y);
  const drsq = add(sq(dx), sq(dy));
  const dr = sqrt(drsq);
  const a = divide(
    multiply(-1, strength, dr, exp(divide(multiply(-0.5, drsq), sq(falloff)))),
    obj.mass,
  );
  const div = divide(a, dr);
  return {
    x: cond(dr, set(obj.vx, add(obj.vx, multiply(dt, dx, div)))),
    y: cond(dr, set(obj.vy, add(obj.vy, multiply(dt, dy, div)))),
  };
}

function bounceBehavior(target: any, obj: any, area: any, bounce: number = 0) {
  const xnodes: Node[] = [];
  const ynodes: Node[] = [];
  const flipx = set(obj.vx, multiply(-1, obj.vx, bounce));
  const flipy = set(obj.vy, multiply(-1, obj.vy, bounce));
  if (area.left !== undefined) {
    xnodes.push(cond(and(eq(target.x, area.left), lessThan(obj.vx, 0)), flipx));
  }
  if (area.right !== undefined) {
    xnodes.push(
      cond(and(eq(target.x, area.right), lessThan(0, obj.vx)), flipx),
    );
  }
  if (area.top !== undefined) {
    xnodes.push(cond(and(eq(target.y, area.top), lessThan(obj.vy, 0)), flipy));
  }
  if (area.bottom !== undefined) {
    xnodes.push(
      cond(and(eq(target.y, area.bottom), lessThan(0, obj.vy)), flipy),
    );
  }
  return {
    x: xnodes,
    y: ynodes,
  };
}

function withInfluence(area: any, target: any, behavior: any) {
  if (!area) {
    return behavior;
  }
  const testLeft = area.left === undefined || lessOrEq(area.left, target.x);
  const testRight = area.right === undefined || lessOrEq(target.x, area.right);
  const testTop = area.top === undefined || lessOrEq(area.top, target.y);
  const testBottom = area.bottom === undefined || lessOrEq(target.y, area.bottom);
  const testNodes: any[] = [testLeft, testRight, testTop, testBottom].filter(
    t => t !== true,
  );
  const test = and(testNodes[0], testNodes[1], ...testNodes.slice(2));
  return {
    x: cond(test, behavior.x),
    y: cond(test, behavior.y),
  };
}

function withLimits(value: any, lowerBound: any, upperBound: any) {
  let result = value;
  if (lowerBound !== undefined) {
    result = cond(lessThan(value, lowerBound), lowerBound, result);
  }
  if (upperBound !== undefined) {
    result = cond(lessThan(upperBound, value), upperBound, result);
  }
  return result;
}

interface SnapPoint {
  x?: number;
  y?: number;
  damping?: number;
  tension?: number;
  id?: string;
}

interface InfluenceArea {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface SpringPoint {
  x?: number;
  y?: number;
  tension?: number;
  damping?: number;
  influenceArea?: InfluenceArea;
}

interface GravityPoint {
  x?: number;
  y?: number;
  strength?: number;
  falloff?: number;
  damping?: number;
  influenceArea?: InfluenceArea;
}

interface FrictionArea {
  damping?: number;
  influenceArea?: InfluenceArea;
}

interface Position {
  x: number;
  y: number;
}

interface Boundaries {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  bounce?: number;
}

interface InteractableProps {
  snapPoints: SnapPoint[];
  springPoints?: SpringPoint[];
  gravityPoints?: GravityPoint[];
  frictionAreas?: FrictionArea[];
  horizontalOnly?: boolean;
  verticalOnly?: boolean;
  animatedValueX?: any;
  animatedValueY?: any;
  style?: StyleProp<ViewStyle>;
  dragEnabled: boolean;
  onSnap?: (e: { nativeEvent: SnapPoint & { index: number } }) => void;
  onStop?: (e: { nativeEvent: { x: number, y: number } }) => void;
  onDrag?: (e: { nativeEvent: { x: number, y: number, state: "start" | "end" } }) => void;
  initialPosition: Position;
  dragToss: number;
  dragWithSpring?: {tension: number, damping: number};
  boundaries?: Boundaries;
}

export default class Interactable extends React.PureComponent<InteractableProps> {
  static defaultProps = {
    dragToss: 0.1,
    dragEnabled: true,
    initialPosition: { x: 0, y: 0 },
  };

  transY: any;

  transX: any;

  onGestureEvent: any;

  position: {
    x: any,
    y: any
  };

  dragging: {
    x?: any,
    y?: any
  };

  snapAnchor: {
    x: any,
    y: any,
    tension: any,
    damping: any
  };

  velocity: {
    x?: any,
    y?: any
  }

  constructor(props: InteractableProps) {
    super(props);

    const gesture = { x: new Value(0), y: new Value(0) };
    const state = new Value(-1);

    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: gesture.x,
          translationY: gesture.y,
          state,
        },
      },
    ]);

    const target = {
      x: new Value(props.initialPosition.x || 0),
      y: new Value(props.initialPosition.y || 0),
    };

    const update = {
      x: props.animatedValueX,
      y: props.animatedValueY,
    };

    const clock = new Clock();

    const dt = divide(diff(clock), 1000);

    const obj = {
      vx: new Value(0),
      vy: new Value(0),
      mass: 1,
    };

    const tossedTarget = {
      x: add(target.x, multiply(props.dragToss, obj.vx)),
      y: add(target.y, multiply(props.dragToss, obj.vy)),
    };

    const permBuckets: [any[], any[], any[]] = [[], [], []];

    const addSpring = (anchor: any, tension: any, influence: any, buckets: any = permBuckets) => {
      buckets[0].push(
        withInfluence(
          influence,
          target,
          springBehavior(dt, target, obj, anchor, tension),
        ),
      );
    };

    const addFriction = (damping: any, influence: any, buckets: any = permBuckets) => {
      buckets[1].push(
        withInfluence(
          influence,
          target,
          frictionBehavior(dt, obj, damping),
        ),
      );
    };

    const addGravity = (
      anchor: any,
      strength: any,
      falloff: any,
      influence: any,
      buckets: any = permBuckets,
    ) => {
      buckets[0].push(
        withInfluence(
          influence,
          target,
          gravityBehavior(dt, target, obj, anchor, strength, falloff),
        ),
      );
    };

    const dragAnchor = { x: new Value(0), y: new Value(0) };
    const dragBuckets: [any[], any[], any[]] = [[], [], []];
    if (props.dragWithSpring) {
      const { tension, damping } = props.dragWithSpring;
      addSpring(dragAnchor, tension, null, dragBuckets);
      addFriction(damping, null, dragBuckets);
    } else {
      dragBuckets[0].push(anchorBehavior(dt, target, obj, dragAnchor));
    }

    const handleStartDrag = props.onDrag
      && call(
        [target.x, target.y],
        ([x, y]) => props.onDrag && props.onDrag({ nativeEvent: { x, y, state: "start" } }),
      );

    const snapBuckets: [any[], any[], any[]] = [[], [], []];
    const snapAnchor = {
      x: new Value(props.initialPosition.x || 0),
      y: new Value(props.initialPosition.y || 0),
      tension: new Value(DEFAULT_SNAP_TENSION),
      damping: new Value(DEFAULT_SNAP_DAMPING),
    };
    const updateSnapTo = snapTo(
      tossedTarget,
      props.snapPoints,
      snapAnchor,
      props.onSnap,
      props.onDrag,
    );

    addSpring(snapAnchor, snapAnchor.tension, null, snapBuckets);
    addFriction(snapAnchor.damping, null, snapBuckets);

    if (props.springPoints) {
      props.springPoints.forEach((pt: any) => {
        addSpring(pt, pt.tension, pt.influenceArea);
        if (pt.damping) {
          addFriction(pt.damping, pt.influenceArea);
        }
      });
    }
    if (props.gravityPoints) {
      props.gravityPoints.forEach((pt) => {
        const falloff = pt.falloff || DEFAULT_GRAVITY_FALLOF;
        addGravity(pt, pt.strength, falloff, pt.influenceArea);
        if (pt.damping) {
          const influenceArea = pt.influenceArea || influenceAreaWithRadius(1.4 * falloff, pt);
          addFriction(pt.damping, influenceArea);
        }
      });
    }
    if (props.frictionAreas) {
      props.frictionAreas.forEach((pt: any) => {
        addFriction(pt.damping, pt.influenceArea);
      });
    }
    if (props.boundaries) {
      snapBuckets[0].push(
        bounceBehavior(
          target,
          obj,
          props.boundaries,
          props.boundaries.bounce,
        ),
      );
    }

    // behaviors can go under one of three buckets depending on their priority
    // we append to each bucket but in Interactable behaviors get added to the
    // front, so we join in reverse order and then reverse the array.
    const sortBuckets = (specialBuckets: any) => ({
      x: specialBuckets
        .map((b: any, idx: number) => [...permBuckets[idx], ...b].reverse().map(b1 => b1.x))
        .reduce((acc: any, b2: any) => acc.concat(b2), []),
      y: specialBuckets
        .map((b: any, idx: number) => [...permBuckets[idx], ...b].reverse().map(b1 => b1.y))
        .reduce((acc: any, b2: any) => acc.concat(b2), []),
    });
    const dragBehaviors = sortBuckets(dragBuckets);
    const snapBehaviors = sortBuckets(snapBuckets);

    const noMovementFrames = {
      x: new Value(
        props.verticalOnly ? ANIMATOR_PAUSE_CONSECUTIVE_FRAMES + 1 : 0,
      ),
      y: new Value(
        props.horizontalOnly ? ANIMATOR_PAUSE_CONSECUTIVE_FRAMES + 1 : 0,
      ),
    };

    const stopWhenNeeded = cond(
      and(
        greaterOrEq(noMovementFrames.x, ANIMATOR_PAUSE_CONSECUTIVE_FRAMES),
        greaterOrEq(noMovementFrames.y, ANIMATOR_PAUSE_CONSECUTIVE_FRAMES),
      ),
      block([
        props.onStop
          ? cond(
            clockRunning(clock),
            call([target.x, target.y], ([x, y]) => props.onStop && props.onStop({ nativeEvent: { x, y } })),
          ) : [],
        stopClock(clock),
      ]),
      startClock(clock),
    );

    const trans = (
      axis: "x" | "y", vaxis: "vx" | "vy",
      lowerBound: "top" | "left" | "right" | "bottom",
      upperBound: "top" | "left" | "right" | "bottom",
    ) => {
      const dragging = new Value(0);
      const start = new Value(0);
      const x = target[axis];
      const vx = obj[vaxis];
      const anchor = dragAnchor[axis];
      const drag = gesture[axis];
      let advance = cond(
        lessThan(abs(vx), ANIMATOR_PAUSE_ZERO_VELOCITY),
        x,
        add(x, multiply(vx, dt)),
      );
      if (props.boundaries) {
        advance = withLimits(
          advance,
          props.boundaries[lowerBound],
          props.boundaries[upperBound],
        );
      }
      const last = new Value(Number.MAX_SAFE_INTEGER);
      const noMoveFrameCount = noMovementFrames[axis];
      const testMovementFrames = cond(
        eq(advance, last),
        set(noMoveFrameCount, add(noMoveFrameCount, 1)),
        [set(last, advance), set(noMoveFrameCount, 0)],
      );
      const step = cond(
        eq(state, State.ACTIVE),
        [
          cond(dragging, 0, block([
            handleStartDrag || [],
            startClock(clock),
            set(dragging, 1),
            set(start, x),
          ])),
          set(anchor, add(start, drag)),
          cond(dt, dragBehaviors[axis]),
        ],
        [
          cond(clockRunning(clock), 0, startClock(clock)),
          cond(dragging, [updateSnapTo, set(dragging, 0)]),
          cond(dt, snapBehaviors[axis]),
          testMovementFrames,
          stopWhenNeeded,
        ],
      );
      const wrapStep = props.dragEnabled
        ? cond(props.dragEnabled as any, step, [set(dragging, 1), stopClock(clock)])
        : step;

      // export some values to be available for imperative commands
      this.dragging[axis] = dragging;
      this.velocity[axis] = vx;

      // update animatedValueX/animatedValueY
      const doUpdateAnReturn = update[axis] ? set(update[axis], x) : x;

      return block([wrapStep, set(x, advance), doUpdateAnReturn]);
    };

    // variables to be used to access reanimated values from imperative commands
    this.dragging = {};
    this.velocity = {};
    this.position = target;
    this.snapAnchor = snapAnchor;

    this.transX = trans("x", "vx", "left", "right");
    this.transY = trans("y", "vy", "top", "bottom");
  }

  // imperative commands
  setVelocity({ x, y }: { x: Adaptable<number>, y: Adaptable<number> }) {
    if (x !== undefined) {
      this.dragging.x.setValue(1);
      this.velocity.x.setValue(x);
    }
    if (y !== undefined) {
      this.dragging.y.setValue(1);
      this.velocity.y.setValue(y);
    }
  }

  snapTo({ index }: { index: number }) {
    const { snapPoints, onSnap } = this.props;
    const snapPoint = snapPoints[index];
    this.snapAnchor.tension.setValue(
      snapPoint.tension || DEFAULT_SNAP_TENSION,
    );
    this.snapAnchor.damping.setValue(
      snapPoint.damping || DEFAULT_SNAP_DAMPING,
    );
    this.snapAnchor.x.setValue(snapPoint.x || 0);
    this.snapAnchor.y.setValue(snapPoint.y || 0);
    if (onSnap) {
      onSnap({ nativeEvent: { ...snapPoint, index } });
    }
  }

  changePosition({ x, y }: { x: Adaptable<number>, y: Adaptable<number>}) {
    if (x !== undefined) {
      this.dragging.x.setValue(1);
      this.position.x.setValue(x);
    }
    if (y !== undefined) {
      this.dragging.x.setValue(1);
      this.position.y.setValue(y);
    }
  }

  render() {
    const { onGestureEvent } = this;
    const {
      children, style, horizontalOnly, verticalOnly, dragEnabled: enabled,
    } = this.props;
    return (
      <PanGestureHandler
        maxPointers={1}
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent, enabled }}
      >
        <Animated.View
          style={[
            style,
            {
              transform: [
                {
                  translateX: verticalOnly ? 0 : this.transX,
                  translateY: horizontalOnly ? 0 : this.transY,
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
