# Transitions

Transitions can attach an animation value to a change of React state.

|        | State (JS Thread)      | Value (UI Thread)        |
| ------ |:----------------------:| ------------------------:|
| Timing | useTimingTransition()  | withTimingTransition()   |
| Spring | useSpringTransition()  | withSpringTransition()   |

```ts
import {useTimingTransition} from "react-native-redash";

const Toggle = () => {
  const [open, setOpen] = useState(false);
  const transition = useTimingTransition(open, { duration: 400 });
}
```

## `useTiming()`

```ts
const useTiming: (state: number | boolean, config?: Animated.WithTimingConfig) => number;
```

## `useSpring()`

```ts
const useSpring: (state: number | boolean, config?: Animated.WithSpringConfig) => number;
```