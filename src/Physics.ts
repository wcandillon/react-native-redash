/**
 * @summary Select a point where the animation should snap to given the value of the gesture and it's velocity.
 * @worklet
 */
export const snapPoint = (
  value: number,
  velocity: number,
  points: ReadonlyArray<number>,
  threshold = 0.5
): number => {
  "worklet";
  const point = value + 0.2 * velocity;

  let startPointIndex = 0;
  let endPointIndex = points.length - 1;

  for (let i = 0, k = points.length - 1; i < points.length; i++, k--) {
    if (points[i] < point) {
      startPointIndex = i;
    }
    if (points[k] > point && points[k] < points[endPointIndex]) {
      endPointIndex = k;
    }
  }

  const middlePoint =
    points[startPointIndex] +
    (points[endPointIndex] - points[startPointIndex]) * threshold;

  return point < middlePoint ? points[startPointIndex] : points[endPointIndex];
};
