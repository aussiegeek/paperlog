import { withDecimalStr } from "./withDecimalStr";
import Decimal from "decimal.js";

describe("withDecimalStr", () => {
  test.each([
    [new Decimal(10), "10.0"],
    [new Decimal(11.0), "11.0"],
    [new Decimal(13.2), "13.2"],
    [new Decimal(6.482), "6.482"],
  ])("withDecimalStr input %s returns %s", (input, output) => {
    expect(withDecimalStr(input)).toBe(output);
  });
});
