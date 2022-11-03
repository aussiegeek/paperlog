import {
  boolean,
  coerce,
  Infer,
  instance,
  integer,
  min,
  pattern,
  string,
} from "superstruct";
import Decimal from "decimal.js";

export * from "./antPath";
export * from "./arrlSection";
export * from "./bands";
export * from "./continent";
export * from "./credit";
export * from "./dxccEntityCode";
export * from "./mode";
export * from "./primaryAdministrativeSubdivision";
export * from "./propagationMode";
export * from "./qslMedium";
export * from "./qslRcvd";
export * from "./qslSent";
export * from "./qslVia";
export * from "./qsoComplete";
export * from "./qsoUploadStatus";
export * from "./region";
export * from "./secondaryAdministrativeSubdivision";

export const Boolean = coerce(
  boolean(),
  string(),
  (value) => value === "true" || value.toUpperCase().trim() == "Y"
);
export const Date = pattern(string(), /^\d{8}$/);
export const GridSquare = pattern(
  string(),
  /^[a-z][a-z][0-9][0-9][a-z]?[a-z]?$/i
);

// a comma-delimited list of GridSquare items
export const GridSquareList = string();

export const IOTARefNo = string();

// a sequence of 11 characters representing a latitude or longitude in XDDD MM.MMM format, where
// X is a directional Character from the set {E, W, N, S}
// DDD is a 3-Digit degrees specifier, where 0 <= DDD <= 180 [use leading zeroes]
// There is a single space character in between DDD and MM.MMM
// MM.MMM is an unsigned Number minutes specifier with its decimal point in the third position, where 00.000 <= MM.MMM <= 59.999  [use leading and trailing zeroes]
export const Location = string();

export const String = string();
export const IntlMultilineString = string();
export const IntlString = string();
export const MultilineString = string();

export const Integer = coerce(integer(), string(), (value) =>
  parseInt(value, 10)
);
export const Number = coerce(
  instance(Decimal),
  string(),
  (value) => new Decimal(value)
);
export const PositiveInteger = min(Integer, 1);
export const SOTARef = string();
export const Time = pattern(
  string(),
  /^([0-2][0-9][0-5][0-9]|[0-2][0-9][0-5][0-9][0-9][0-9])$/
);
export const WWFFRef = string();

// a colon-delimited list of two or more members of the Secondary_Administrative_Subdivision enumeration.  E.g.:
// MA,Franklin:MA,Hampshire
export const SecondarySubdivisionList = string();

/* a comma-delimited list where each list item is either:
 A member of the Credit enumeration.
 A member of the Credit enumeration followed by a colon and an ampersand-delimited list of members of the QSL_Medium enumeration.
 For example IOTA,WAS:LOTW&CARD,DXCC:CARD */
export const CreditList = string();
export type CreditList = Infer<typeof CreditList>;
export const SponsoredAwardList = string();
