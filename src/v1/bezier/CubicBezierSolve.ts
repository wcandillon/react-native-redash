import Animated from "react-native-reanimated";

import { find } from "../Array";
import { approximates } from "../Math";

const {
  Value,
  and,
  cond,
  divide,
  add,
  multiply,
  block,
  greaterThan,
  eq,
  lessThan,
  pow,
  sqrt,
  set,
  sub,
  cos,
  not,
  acos,
} = Animated;

const isRootValidForCubicBezier = (root: Animated.Node<number>) =>
  and(greaterThan(root, 0), lessThan(root, 1));

// pomax.github.io/bezierinfo/#extremities
const cuberoot = (v: Animated.Adaptable<number>) =>
  cond(
    lessThan(v, 0),
    multiply(pow(multiply(v, -1), 1 / 3), -1),
    pow(v, 1 / 3)
  );

const cubicBezierSolve = (
  pa: Animated.Adaptable<number>,
  pb: Animated.Adaptable<number>,
  pc: Animated.Adaptable<number>,
  pd: Animated.Adaptable<number>
): Animated.Node<number> => {
  const a: Animated.Value<number> = new Value();
  const b: Animated.Value<number> = new Value();
  const c: Animated.Value<number> = new Value();
  const d: Animated.Value<number> = new Value();
  const root1: Animated.Value<number> = new Value();
  const root2: Animated.Value<number> = new Value();
  const root3: Animated.Value<number> = new Value();

  const q: Animated.Value<number> = new Value();
  const q2: Animated.Value<number> = new Value();
  const p: Animated.Value<number> = new Value();
  const p3: Animated.Value<number> = new Value();
  const discriminant: Animated.Value<number> = new Value();

  const mp3: Animated.Value<number> = new Value();
  const mp33: Animated.Value<number> = new Value();
  const r: Animated.Value<number> = new Value();
  const t: Animated.Value<number> = new Value();
  const cosphi: Animated.Value<number> = new Value();
  const phi: Animated.Value<number> = new Value();
  const crtr: Animated.Value<number> = new Value();
  const t1: Animated.Value<number> = new Value();

  const u1: Animated.Value<number> = new Value();

  const sd: Animated.Value<number> = new Value();
  const v1: Animated.Value<number> = new Value();
  const sq: Animated.Value<number> = new Value();

  return block([
    set(a, add(multiply(3, pa), multiply(-6, pb), multiply(3, pc))),
    set(b, add(multiply(-3, pa), multiply(3, pb))),
    set(c, pa),
    set(d, add(multiply(-1, pa), multiply(3, pb), multiply(-3, pc), pd)),
    cond(
      approximates(d, 0, 0.001),
      cond(
        approximates(d, 0, 0.001),
        cond(
          not(approximates(b, 0, 0.001)),
          set(root1, divide(multiply(-1, c), b)),
          [
            set(q, sqrt(sub(pow(b, 2), multiply(4, a, c)))),
            set(root1, divide(sub(q, b), multiply(2, a))),
            set(root2, divide(sub(multiply(b, -1), q), multiply(2, a))),
          ]
        )
      ),
      [
        set(a, divide(a, d)),
        set(b, divide(b, d)),
        set(c, divide(c, d)),
        set(p, divide(sub(multiply(3, b), multiply(a, a)), 3)),
        set(p3, divide(p, 3)),
        set(
          q,
          divide(
            add(multiply(2, a, a, a), multiply(-9, a, b), multiply(27, c)),
            27
          )
        ),
        set(q2, divide(q, 2)),
        set(discriminant, add(multiply(q2, q2), multiply(p3, p3, p3))),
        cond(
          lessThan(discriminant, 0),
          [
            set(mp3, divide(multiply(p, -1), 3)),
            set(mp33, multiply(mp3, mp3, mp3)),
            set(r, sqrt(mp33)),
            set(t, divide(multiply(q, -1), multiply(2, r))),
            set(
              cosphi,
              cond(lessThan(t, -1), -1, cond(greaterThan(t, 1), 1, t))
            ),
            set(phi, acos(cosphi)),
            set(crtr, cuberoot(r)),
            set(t1, multiply(2, crtr)),
            set(root1, sub(multiply(t1, cos(divide(phi, 3))), divide(a, 3))),
            set(
              root2,
              sub(
                multiply(t1, cos(divide(add(phi, 2 * Math.PI), 3))),
                divide(a, 3)
              )
            ),
            set(
              root3,
              sub(
                multiply(t1, cos(divide(add(phi, 4 * Math.PI), 3))),
                divide(a, 3)
              )
            ),
          ],
          cond(
            eq(discriminant, 0),
            [
              set(
                u1,
                cond(
                  lessThan(q2, 0),
                  cuberoot(multiply(q2, -1)),
                  multiply(cuberoot(q2), -1)
                )
              ),
              set(root1, sub(multiply(2, u1), divide(a, 3))),
              set(root2, sub(multiply(-1, u1), divide(a, 3))),
            ],
            [
              set(sd, sqrt(discriminant)),
              set(u1, cuberoot(sub(sq, q2))),
              set(v1, cuberoot(add(sq, q2))),
              set(root1, sub(u1, v1, divide(a, 3))),
            ]
          )
        ),
      ]
    ),
    find([root1, root2, root3], isRootValidForCubicBezier),
  ]);
};

export default cubicBezierSolve;
