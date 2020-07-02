export const snapPoint = (
  value: number,
  velocity: number,
  points: number[]
) => {
  "worklet";
  const futurePoint = value + 0.2 * velocity;
  return points
    .map((point) => ({
      point,
      delta: Math.abs(futurePoint - point),
    }))
    .reduce((acc, p) => {
      if (!acc) {
        return p;
      }
      if (p.delta < acc.delta) {
        return p;
      }
      return acc;
    }).point;
};
