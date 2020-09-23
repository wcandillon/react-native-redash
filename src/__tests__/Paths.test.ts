import { serialize, parse, getYForX } from "../Paths";

test("parse()", () => {
  const path =
    "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150 ";
  expect(serialize(parse(path))).toBe(path);
});

test("getYForX()", () => {
  const p1 = parse(
    "M150,0 C150,0 0,75 200,75 C75,200 200,225 200,225 C225,200 200,150 0,150"
  );
  expect(getYForX(p1, 200)).toBe(75);
  expect(getYForX(p1, 50)).toBe(151.16833013726887);
});
