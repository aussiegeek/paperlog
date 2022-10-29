import {
  array,
  boolean,
  coerce,
  Infer,
  integer,
  min,
  number,
  pattern,
  string,
} from "superstruct";
import { CreditEnum } from "./credit";

export * from "./antPath";
export * from "./arrlSection";
export * from "./bands";
export * from "./continent";
export * from "./dxccEntityCode";
export * from "./mode";
export * from "./primaryAdministrativeSubdivision";
export * from "./propagationMode";
export * from "./qslRcvd";
export * from "./qslSent";
export * from "./qslVia";
export * from "./qsoComplete";
export * from "./qsoUploadStatus";
export * from "./region";
export * from "./secondaryAdministrativeSubdivision";

export const Boolean = boolean();
export const Date = pattern(string(), /^\d{8}$/);
export const GridSquare = pattern(
  string(),
  /^[a-z][a-z][0-9][0-9][a-z]?[a-z]?$/i
);

// a comma-delimited list of GridSquare items
export const GridSquareList = string();

export const Integer = integer();
export const IntlMultilineString = string();
export const IntlString = string();
export const IOTARefNo = string();

// a sequence of 11 characters representing a latitude or longitude in XDDD MM.MMM format, where
// X is a directional Character from the set {E, W, N, S}
// DDD is a 3-Digit degrees specifier, where 0 <= DDD <= 180 [use leading zeroes]
// There is a single space character in between DDD and MM.MMM
// MM.MMM is an unsigned Number minutes specifier with its decimal point in the third position, where 00.000 <= MM.MMM <= 59.999  [use leading and trailing zeroes]
export const Location = string();
export const MultilineString = string();
export const Number = coerce(number(), string(), (value) => parseFloat(value));
export const PositiveInteger = min(Number, 1);
export const SOTARef = string();
export const String = string();
export const Time = pattern(
  string(),
  /^([0-2][0-9][0-5][0-9]|[0-2][0-9][0-5][0-9][0-9][0-9])$/
);
export const WWFFRef = string();

// a colon-delimited list of two or more members of the Secondary_Administrative_Subdivision enumeration.  E.g.:
// MA,Franklin:MA,Hampshire
export const SecondarySubdivisionList = string();

export const CreditList = array(CreditEnum);
export type CreditList = Infer<typeof CreditList>;
export const SponsoredAwardList = string();
