import { useSharedValue } from "react-native-reanimated";

// type RawSharedValue = number | string | boolean | object;
type SharedValueType = number;

export interface Vector<T extends SharedValueType> {
  x: {
    value: T;
  };
  y: {
    value: T;
  };
}

export const useVector = (x1 = 0, y1?: number): Vector<number> => {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);
  return { x, y };
};

type VectorType = Vector<SharedValueType>;

type VectorList = (VectorType | SharedValueType)[];

const isVector = (value: unknown): value is Vector<SharedValueType> => {
  "worklet";

  return (
    typeof value === "object" && value !== null && "x" in value && "y" in value
  );
};

const resolveValue = <T extends Vector<SharedValueType>[VectorProp]>(
  value: T
) => {
  "worklet";

  return value.value;
};

type VectorProp = "x" | "y";

const resolveValueByProp = (vector: VectorType | number, prop: VectorProp) => {
  return isVector(vector) ? resolveValue(vector[prop]) : vector;
};

enum Operation {
  "divide",
  "add",
  "sub",
  "multiply",
}

const applyOperation = (
  operation: Operation,
  prop: VectorProp,
  vectors: VectorList
) => {
  "worklet";
  const [first] = vectors;
  const rest = vectors.slice(1);

  const initial = resolveValueByProp(first, prop);

  const res = rest.reduce<number>((acc, current) => {
    const value = resolveValueByProp(current, prop);

    const result = (() => {
      switch (operation) {
        case Operation.divide:
          if (value === 0) {
            return 0;
          }
          return acc / value;
        case Operation.add:
          return acc + value;
        case Operation.sub:
          return acc - value;
        case Operation.multiply:
          return acc * value;
        default:
          return acc;
      }
    })();

    return result;
  }, initial);

  return res;
};

export const useSharedVector = <T>(x: T, y = x) => {
  return {
    x: useSharedValue(x),
    y: useSharedValue(y),
  };
};

const createValue = <T extends SharedValueType>(value: T) => ({
  value,
});

export const create = <T extends SharedValueType>(x: T, y: T) => {
  "worklet";

  return {
    x: createValue(x),
    y: createValue(y),
  };
};

export const add = (...vectors: VectorList) => {
  "worklet";

  return create(
    applyOperation(Operation.add, "x", vectors),
    applyOperation(Operation.add, "y", vectors)
  );
};

export const sub = (...vectors: VectorList) => {
  "worklet";

  return create(
    applyOperation(Operation.sub, "x", vectors),
    applyOperation(Operation.sub, "y", vectors)
  );
};

export const divide = (...vectors: VectorList) => {
  "worklet";

  return create(
    applyOperation(Operation.divide, "x", vectors),
    applyOperation(Operation.divide, "y", vectors)
  );
};

export const multiply = (...vectors: VectorList) => {
  "worklet";

  return create(
    applyOperation(Operation.multiply, "x", vectors),
    applyOperation(Operation.multiply, "y", vectors)
  );
};

export const invert = <T extends VectorType>(vector: T) => {
  "worklet";

  return create(resolveValue(vector.x) * -1, resolveValue(vector.y) * -1);
};

type Callback = () => number;

export const set = <T extends VectorType>(
  vector: T,
  value: VectorType | SharedValueType | Callback
) => {
  "worklet";

  // handle animation
  if (typeof value === "function") {
    vector.x.value = value();
    vector.y.value = value();
  } else {
    vector.x.value = resolveValueByProp(vector, "x");
    vector.y.value = resolveValueByProp(vector, "y");
  }
};

export const min = (...vectors: VectorList) => {
  "worklet";

  const getMin = (prop: VectorProp) => {
    return Math.min.apply(
      void 0,
      vectors.map((item) => resolveValueByProp(item, prop))
    );
  };

  return create(getMin("x"), getMin("y"));
};

export const max = (...vectors: VectorList) => {
  "worklet";

  const getMax = (prop: VectorProp) =>
    Math.max.apply(
      void 0,
      vectors.map((item) => resolveValueByProp(item, prop))
    );

  return create(getMax("x"), getMax("y"));
};

export const clamp = <T extends VectorType>(
  value: T,
  lowerBound: VectorType | SharedValueType,
  upperBound: VectorType | SharedValueType
) => {
  "worklet";

  return min(max(lowerBound, value), upperBound);
};

export const eq = <T extends VectorType>(
  vector: T,
  value: VectorType | SharedValueType
) => {
  "worklet";

  const x = resolveValueByProp(value, "x");
  const y = resolveValueByProp(value, "y");

  return resolveValue(vector.x) === x && resolveValue(vector.y) === y;
};
