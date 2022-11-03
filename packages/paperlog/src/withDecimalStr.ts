import type Decimal from "decimal.js";

/*
 * make sure decimal string always has a decimal in it (ie 14 -> 14.0),
 * but keeps existing precision if decimals exist
 */
export function withDecimalStr(n: Decimal) {
  if (n.decimalPlaces() == 0) {
    return n.toFixed(1);
  } else {
    return n.toString();
  }
}
