import { useSharedValue } from "react-native-reanimated";

export interface Vector<T = any> {
  x: T;
  y: T;
}

export const useVector = (x1 = 0, y1?: number): Vector => {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);
  return { x, y };
};
