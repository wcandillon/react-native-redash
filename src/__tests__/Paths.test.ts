import { serialize, parse } from "../Paths";

test("parse()", () => {
  const path =
    "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150 ";
  expect(serialize(parse(path))).toBe(path);
});

/*
test("serialize()", () => {
  const p1 =
    "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150 ";
  const p2 =
    "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150 ";
  const aPath = interpolatePath(1, [0, 1], [parse(p1), parse(p2)]);
  expect(aPath).toBe(p2);
});
*/
