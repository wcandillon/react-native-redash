import { serialize, parse, getYForX } from "../Paths";

import { d1, d2 } from "./paths";

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
  expect(getYForX(p1, 50)).toBe(151.160325);
  expect(() => getYForX(p1, 750)).toThrow();
});

test("getYForX2()", () => {
  const p1 = parse(d1);
  expect(getYForX(p1, 358.7)).toBeCloseTo(42.92573877023815, 4);
  expect(getYForX(p1, 358.8)).toBeCloseTo(42.90651208682783, 4);
  expect(getYForX(p1, 359)).toBeCloseTo(42.878457025833086, 4);
});

test("getYForX3()", () => {
  const p2 = parse(d2);
  expect(getYForX(p2, 414)).toBe(15.75);
});
