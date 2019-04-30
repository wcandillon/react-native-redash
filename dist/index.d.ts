import Animated from "react-native-reanimated";
declare const clockRunning: typeof Animated.clockRunning, add: (a: Animated.Adaptable<number>, b: Animated.Adaptable<number>, ...others: Animated.Adaptable<number>[]) => Animated.Node<number>, timing: typeof Animated.timing;
export { timing, clockRunning, add };
export declare type TimingConfig = Parameters<typeof timing>[1];
export declare type Clock = Parameters<typeof clockRunning>[0];
export declare type Node = ReturnType<typeof add>;
export declare type Adaptable<T> = Node | T;
export declare const toRad: (deg: number | Animated.Node<number>) => Animated.Node<number>;
export declare const toDeg: (rad: number | Animated.Node<number>) => Animated.Node<number>;
export declare const min: (...args: (number | Animated.Node<number>)[]) => number | Animated.Node<number>;
export declare const max: (...args: (number | Animated.Node<number>)[]) => number | Animated.Node<number>;
export declare const atan: (x: number | Animated.Node<number>) => Animated.Node<number>;
export declare const atan2: (y: number | Animated.Node<number>, x: number | Animated.Node<number>) => Animated.Node<number>;
export declare const getSnapPoint: (value: number | Animated.Node<number>, velocity: number | Animated.Node<number>, points: number[]) => Animated.Node<number>;
export declare const lookup: (array: (number | Animated.Node<number>)[], index: number | Animated.Node<number>, notFound?: Animated.Node<number>) => number | Animated.Node<number>;
export declare function runSpring(clock: Clock, value: Adaptable<number>, dest: Adaptable<number>): Animated.Node<number>;
export declare function runTiming(clock: Clock, value: Adaptable<any>, config: TimingConfig): Animated.Node<number>;
interface RGBColor {
    r: number;
    g: number;
    b: number;
}
export declare const interpolateColors: (animationValue: number | Animated.Node<number>, inputRange: number[], colors: RGBColor[]) => any;
export declare const translateZ: (perspective: number | Animated.Node<number>, z: number | Animated.Node<number>) => {
    scale: Animated.Node<number>;
};
export declare const onScroll: (contentOffset: {
    x?: Animated.Node<number> | undefined;
    y?: Animated.Node<number> | undefined;
}) => (...args: any[]) => void;
