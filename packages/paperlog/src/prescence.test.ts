import { presence } from "./presence";

describe("presence", () => {
  test("no changes when all values are defined", () => {
    expect(presence({ a: 1, b: "two" })).toStrictEqual({ a: 1, b: "two" });
  });

  test("removes key with undefined value", () => {
    expect(presence({ a: 1, b: "two", c: undefined })).toStrictEqual({
      a: 1,
      b: "two",
    });
  });

  test("removes nulls", () => {
    expect(presence({ a: 1, b: "two", c: null })).toStrictEqual({
      a: 1,
      b: "two",
    });
  });
});
