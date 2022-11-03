import { isPresent } from "./isPresent";

describe("isPresent", () => {
  describe("string", () => {
    test("string is zero length", () => {
      expect(isPresent("")).toBe(false);
    });

    test("value is undefined", () => {
      expect(isPresent(undefined)).toBe(false);
    });

    test("value is null", () => {
      expect(isPresent(null)).toBe(false);
    });

    test("value is non empty string", () => {
      expect(isPresent("hi")).toBe(true);
    });
  });
});
