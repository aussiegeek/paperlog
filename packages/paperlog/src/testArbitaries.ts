import fc from "fast-check";
import { adifRecordKeys, blankAdifRecord } from "./adif/adifRecord";
import { bandRange } from "./adif/bands";
import { adifRecordArbs } from "./adif/adifRecordArbs";
import {
  callsignArb,
  dateArb,
  gridSquareArb,
  modeEnumArb,
  potaRefArb,
  sotaRefArb,
  timeWithoutSeconds,
  timeWithSecondsArb,
  wwffRefArb,
} from "./adif/adifFieldArbs";
import { valueLength } from "./adif";
import Decimal from "decimal.js";
import { withDecimalStr } from "./withDecimalStr";
import { presence } from "./presence";

function generateCmdArb(command: string, arb: fc.Arbitrary<string>) {
  return arb.map((val) => [command, val].join(" "));
}

export const modeCmdArb = generateCmdArb("mode", modeEnumArb);
export const dateCmdArb = generateCmdArb("date", dateArb);

export const frequencyArb = fc
  .constantFrom(...Object.values(bandRange))
  .chain((band) => fc.double({ min: band.from, max: band.to, noNaN: true }))
  .map((f) => new Decimal(f));

export const frequencyStringArb = frequencyArb.map((f) => withDecimalStr(f));

export const frequencyCommandArb = frequencyStringArb;

export const timeOnCmdArb = fc.oneof(
  timeWithoutSeconds,
  timeWithoutSeconds.map((time) => `timeon ${time}`),
  timeWithSecondsArb.map((time) => `timeon ${time}`)
);

export const callCmdArb = generateCmdArb("call", callsignArb);
export const stationCmdArb = generateCmdArb("station", callsignArb);
export const operatorCmdArb = generateCmdArb("operator", callsignArb);

export const logEntryLineArb = () =>
  fc
    .tuple(callCmdArb, timeOnCmdArb, fc.array(commandArb))
    .map(([call, timeOn, commands]) => [call, timeOn, ...commands].join(" "));

export const signalReportArb = fc.oneof(
  fc
    .tuple(
      fc.integer({ min: 1, max: 5 }),
      fc.integer({ min: 1, max: 9 }),
      fc.option(fc.integer({ min: 1, max: 9 }))
    )
    .map((t) => t.join("")),
  fc
    .tuple(
      fc.constantFrom("+", "-"),
      fc.integer({ min: 1, max: 9 }),
      fc.integer({ min: 1, max: 9 })
    )
    .map((t) => t.join(""))
);

export const signalReportRcvdCmdArb = signalReportArb.map(
  (report) => `r${report}`
);
export const signalReportSentCmdArb = signalReportArb.map(
  (report) => `s${report}`
);

const sotaCmdArb = generateCmdArb("sota", sotaRefArb);
const mySotaCmdArb = generateCmdArb("mysota", sotaRefArb);

const wwffCmdArb = generateCmdArb("wwff", wwffRefArb);
const mywwffCmdArb = generateCmdArb("mywwff", wwffRefArb);

const potaCmdArb = generateCmdArb("pota", potaRefArb);
const mypotaCmdArb = generateCmdArb("mypota", potaRefArb);

const txPwrArb = fc.integer({ min: 1, max: 2000 });
const txPwrCmdArb = txPwrArb.map((pwr) => ["txpwr", pwr].join(" "));

const gridsquareCmdArb = generateCmdArb("gridsquare", gridSquareArb);
const mygridsquareCmdArb = generateCmdArb("mygridsquare", gridSquareArb);

export const adifFieldCmdArb = fc
  .tuple(
    fc.constantFrom<typeof adifRecordKeys[number]>(...adifRecordKeys),
    fc.boolean()
  )
  .chain(([field, useQuotes]) =>
    fc.tuple(fc.constant(field), fc.constant(useQuotes), adifRecordArbs[field])
  )
  .map(([field, useQuotes, value]) => {
    if (useQuotes || (typeof value == "string" && value.indexOf(" ") > 0)) {
      return `[${field}] "${value}"`;
    } else {
      return `[${field}] ${value}`;
    }
  });

/* produce a string for insertion in an adif file with a field and value */
export const adifFieldStrArb = fc
  .tuple(fc.constantFrom<typeof adifRecordKeys[number]>(...adifRecordKeys))
  .chain(([field]) => fc.tuple(fc.constant(field), adifRecordArbs[field]))
  .map(([field, value]) => {
    return `<${field}${valueLength(value)}>${value}`;
  });

export const adifRecordStrArb = fc
  .array(adifFieldStrArb, { minLength: 1 })
  .map((t) => `${t.join("")}<eor>`);

export const adifFileStrArb = fc
  .array(adifRecordStrArb)
  .map((t) => t.join("\n"));

export const adifRecordArb = fc.record(adifRecordArbs, {
  requiredKeys: [
    "call",
    "qsoDate",
    "timeOn",
    "stationCallsign",
    "mode",
    "freq",
    "rstRcvd",
    "rstSent",
  ],
});

export const adifRecordValidatedArb = fc
  .tuple(
    fc.record(adifRecordArbs, {
      requiredKeys: [
        "call",
        "qsoDate",
        "timeOn",
        "stationCallsign",
        "mode",
        "freq",
        "rstRcvd",
        "rstSent",
      ],
    }),
    fc.option(potaRefArb, { nil: undefined })
  )
  .map(([r, myPotaRef]) => {
    return presence({ appPaperlogMyPotaRef: myPotaRef, ...r });
  });

export const adifFileArb = fc.record({
  header: fc.constant(undefined),
  records: fc.array(adifRecordArb),
});

export const adifFileValidatedArb = fc.record({
  header: fc.constant(undefined),
  records: fc.array(adifRecordValidatedArb),
});

export const commandArb = fc.oneof(
  frequencyCommandArb,
  callCmdArb,
  timeOnCmdArb,
  modeCmdArb,
  stationCmdArb,
  operatorCmdArb,
  dateCmdArb,
  signalReportRcvdCmdArb,
  signalReportSentCmdArb,
  sotaCmdArb,
  mySotaCmdArb,
  wwffCmdArb,
  mywwffCmdArb,
  potaCmdArb,
  mypotaCmdArb,
  txPwrCmdArb,
  gridsquareCmdArb,
  mygridsquareCmdArb,
  adifFieldCmdArb
);
