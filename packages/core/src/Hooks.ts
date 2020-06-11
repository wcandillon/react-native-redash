import { useEffect } from "react";
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";

import { bin } from "./Math";

export const useSpringTransition = (state: boolean | number, config) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === "boolean" ? bin(state) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withSpring(value.value, config);
  });
  return transition;
};

export const useTransition = (
  state: boolean | number,
  config = { duration: 250 }
) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === "boolean" ? bin(state) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withTiming(value.value, config);
  });
  return transition;
};
