import { format } from "date-fns";
import fc from "fast-check";
import { antPath } from "./antPath";
import { arrlSection } from "./arrlSection";
import { awardSponsor } from "./awardSponsor";
import { bands } from "./bands";
import { continent } from "./continent";
import { credit } from "./credit";
import { dxccEntityCode } from "./dxccEntityCode";
import { mode } from "./mode";
import { primaryAdministrativeSubdivision } from "./primaryAdministrativeSubdivision";
import { propagationMode } from "./propagationMode";
import { qslMedium } from "./qslMedium";
import { qslRcvd } from "./qslRcvd";
import { qslSent } from "./qslSent";
import { qslVia } from "./qslVia";
import { qsoComplete } from "./qsoComplete";
import { qsoUploadStatus } from "./qsoUploadStatus";
import { region } from "./region";
import { secondaryAdministrativeSubdivision } from "./secondaryAdministrativeSubdivision";
import Decimal from "decimal.js";

const gridSquareLetterArb = fc.constantFrom(
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R"
);

const alphaArb = fc.constantFrom(
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "X",
  "Y",
  "Z"
);

export const stringArb = fc.stringOf(alphaArb, { minLength: 1 });
export const multilineStringArb = stringArb;
export const intlMultilineStringArb = stringArb;
export const intlStringArb = stringArb;

const fourDigitGridSquareArb = fc
  .tuple(
    gridSquareLetterArb,
    gridSquareLetterArb,
    fc.integer({ min: 0, max: 9 }),
    fc.integer({ min: 0, max: 9 })
  )
  .map((t) => t.join(""));
const sixDigitGridSquareArb = fc
  .tuple(
    gridSquareLetterArb,
    gridSquareLetterArb,
    fc.integer({ min: 0, max: 9 }),
    fc.integer({ min: 0, max: 9 }),
    gridSquareLetterArb,
    gridSquareLetterArb
  )
  .map((t) => t.join(""));
export const gridSquareArb = fc.oneof(
  fourDigitGridSquareArb,
  sixDigitGridSquareArb
);

const prefixArb = fc.constantFrom("A", "VK", "VJ", "ZL", "9M", "4Z");

const locatorArb = prefixArb.map((prefix) => `${prefix}/`);
const suffixArb = fc
  .constantFrom("P", "M", "QRP", 2)
  .map((suffix) => `/${suffix}`);

// limit to 'reasonable' date ranges of qsos
const qsoDateRangeArb = fc.date({
  min: new Date("1900-01-01"),
  max: new Date("2100-01-01"),
});

export const dateArb = qsoDateRangeArb.map((d) => format(d, "yyyyMMdd"));
export const timeWithoutSeconds = qsoDateRangeArb.map((d) => format(d, "HHmm"));
export const timeWithSecondsArb = qsoDateRangeArb.map((d) =>
  format(d, "HHmmss")
);
export const timeArb = fc.oneof(timeWithSecondsArb, timeWithSecondsArb);

export const callsignArb = fc
  .tuple(
    fc.option(locatorArb),
    prefixArb,
    fc.integer({ min: 0, max: 9 }),
    fc.stringOf(alphaArb, { minLength: 1, maxLength: 4 }),
    fc.option(suffixArb)
  )
  .map((t) => t.join(""));

export const sotaRefArb = fc
  .tuple(
    locatorArb,
    fc.integer({ min: 0, max: 9 }),
    fc.stringOf(alphaArb, { minLength: 1, maxLength: 3 }),
    fc.integer({ min: 1, max: 999 })
  )
  .map(([locator, regionNum, area, summitNum]) =>
    [locator, regionNum, "/", area, "-", summitNum].join("")
  );

export const wwffRefArb = fc
  .tuple(fc.constantFrom("VK", "G"), fc.integer({ min: 0, max: 9999 }))
  .map((t) => t.join("-"));

export const antPathEnumArb = fc.constantFrom(...antPath);
export const arrlSectionEnumArb = fc.constantFrom(...arrlSection);
export const bandEnumArb = fc.constantFrom(...bands);
export const continentEnumArb = fc.constantFrom(...continent);
export const creditArb = fc.constantFrom(...credit);

export const dxccEntityCodeEnumArb = fc.constantFrom(...dxccEntityCode);
export const modeEnumArb = fc.constantFrom(...mode);
export const primaryAdministrativeSubdivisionEnumArb = fc.constantFrom(
  ...primaryAdministrativeSubdivision
);
export const propagationModeEnumArb = fc.constantFrom(...propagationMode);
export const qslRcvdEnumArb = fc.constantFrom(...qslRcvd);
export const qslSentEnumArb = fc.constantFrom(...qslSent);
export const qslViaEnumArb = fc.constantFrom(...qslVia);
export const qslMediumArb = fc.constantFrom(...qslMedium);
export const qsoCompleteEnumArb = fc.constantFrom(...qsoComplete);
export const qsoUploadStatusEnumArb = fc.constantFrom(...qsoUploadStatus);
export const regionEnumArb = fc.constantFrom(...region);
export const secondaryAdministrativeSubdivisionEnumArb = fc.constantFrom(
  ...secondaryAdministrativeSubdivision
);

export const sponsoredAwardArb = fc
  .tuple(
    fc.constantFrom(...awardSponsor),
    fc.constant("PROGRAM"),
    fc.constant("AWARD")
  )
  .map((t) => t.join("_"));

export const sponsoredAwardListArb = fc
  .array(sponsoredAwardArb, { minLength: 1 })
  .map((t) => t.join(","));

export const creditListArb = fc
  .array(
    fc.oneof(
      creditArb,
      fc.tuple(creditArb, qslMediumArb).map((t) => t.join(":"))
    ),
    { minLength: 1 }
  )
  .map((collection) => collection.join(","));

export const booleanArb = fc.boolean();

/*
  two or four adjacent Maidenhead grid locators, each four characters long, representing the logging station's grid
  squares that the contacted station may claim for the ARRL VUCC award program.
  E.g. EN98,FM08,EM97,FM07
*/

export const gridSquareListArb = fc
  .array(fourDigitGridSquareArb, { minLength: 1 })
  .map((t) => t.join(","));

export const integerArb = fc.integer();

export const iotaRefNoArb = stringArb;

const padNumber = (number: number, digits: number) => {
  return new Intl.NumberFormat("en", { minimumIntegerDigits: digits }).format(
    number
  );
};

/* a sequence of 11 characters representing a latitude or longitude in XDDD MM.MMM format, where
X is a directional Character from the set {E, W, N, S}
DDD is a 3-Digit degrees specifier, where 0 <= DDD <= 180 [use leading zeroes]
There is a single space character in between DDD and MM.MMM
MM.MMM is an unsigned Number minutes specifier with its decimal point in the third position, where 00.000 <= MM.MMM <= 59.999  [use leading and trailing zeroes]
*/

export const locationArb = fc
  .tuple(
    fc.constantFrom("E", "N", "S", "W"),
    fc
      .integer({ min: 0, max: 180 })
      .map((n) =>
        new Intl.NumberFormat("en", { minimumIntegerDigits: 3 }).format(n)
      ),
    fc.integer({ min: 0, max: 59 }).map((n) => padNumber(n, 2)),
    fc.integer({ min: 0, max: 999 }).map((n) => padNumber(n, 3))
  )
  .map(([x, d, m, n]) => `${x}${d} ${m}.${n}`);

export const numberArb = fc.nat().map((n) => new Decimal(n));
export const positiveIntegerArb = fc.integer({ min: 1 });

/*
a colon-delimited list of two or more members of the Secondary_Administrative_Subdivision enumeration.  E.g.:

MA,Franklin:MA,Hampshire
*/

export const secondarySubdivisionListArb = fc
  .array(fc.constantFrom(...secondaryAdministrativeSubdivision), {
    minLength: 1,
  })
  .map((t) => t.join(","));

export const potaRefArb = fc
  .tuple(fc.constantFrom("VK", "ZL"), fc.integer({ min: 0, max: 9999 }))
  .map((t) => t.join("-"));
