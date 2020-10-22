import {
  identityMatrix4,
  matrixVecMul4,
  multiply4,
  processTransform3d,
} from "../Matrix4";

test("processTransform3d()", () => {
  expect(
    processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }])
  ).toStrictEqual([
    [-1, 0, 1.2246467991473532e-16, 0],
    [1.4997597826618576e-32, -1, 1.2246467991473532e-16, 0],
    [1.2246467991473532e-16, 1.2246467991473532e-16, 1, 0],
    [0, 0, 0, 1],
  ]);
});

test("multiply4()", () => {
  expect(
    multiply4(
      identityMatrix4,
      processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }])
    )
  ).toStrictEqual([
    [-1, 0, 1.2246467991473532e-16, 0],
    [1.4997597826618576e-32, -1, 1.2246467991473532e-16, 0],
    [1.2246467991473532e-16, 1.2246467991473532e-16, 1, 0],
    [0, 0, 0, 1],
  ]);
});

test("matrixVecMul4()", () => {
  expect(
    matrixVecMul4(
      processTransform3d([{ rotateX: Math.PI }, { rotateY: Math.PI }]),
      [0.5, 0.5, 0, 1]
    )
  ).toStrictEqual([-0.5, -0.5, 1.2246467991473532e-16, 1]);
});
