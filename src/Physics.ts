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
  const point = Math.abs(value + 0.2 * velocity);
  const absolutePoints = points.map((_point) => Math.abs(_point));

  let startPointIndex = 0;
  let endPointIndex = points.length - 1;

  for (let i = 0, k = points.length - 1; i < points.length; i++, k--) {
    if (absolutePoints[i] < point) {
      startPointIndex = i;
    }
    if (
      absolutePoints[k] > point &&
      absolutePoints[k] < absolutePoints[endPointIndex]
    ) {
      endPointIndex = k;
    }
  }

  const middlePoint =
    absolutePoints[startPointIndex] +
    (absolutePoints[endPointIndex] - absolutePoints[startPointIndex]) *
      threshold;

  return point < middlePoint ? points[startPointIndex] : points[endPointIndex];
};
