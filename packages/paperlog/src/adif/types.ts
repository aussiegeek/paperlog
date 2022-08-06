import { boolean, integer, min, number, pattern, string } from "superstruct";

export const Boolean = boolean();
export const Date = pattern(string(), /^\d{8}$/);
export const GridSquare = string();
export const Integer = integer();
export const IntlMultilineString = string();
export const IntlString = string();
export const IOTARefNo = string();
export const Location = number();
export const MultilineString = string();
export const Number = number();
export const PositiveInteger = min(number(), 1);
export const SOTARef = string();
export const String = string();
export const Time = pattern(string(), /^[0-2][0-9][0-5][0-9]$/);
export const WWFFRef = string();
