import { format } from "date-fns";
import fc from "fast-check";
import type { ParserContact } from ".";
import type { BandEnum } from "./adif/bands";
import { bandRange, bands } from "./adif/bands";
import { modes } from "./adif/modes";

function generateCmdArb(command: string, arb: () => fc.Arbitrary<string>) {
  return () => arb().map((val) => [command, val].join(" "));
}

export const modeArb = () => fc.constantFrom(...modes);
export const modeCmdArb = generateCmdArb("mode", modeArb);

export const frequencyArb = () =>
  fc
    .constantFrom(...Object.values(bandRange))
    .chain((band) => fc.double({ min: band.from, max: band.to, noNaN: true }));

export const frequencyStringArb = () =>
  frequencyArb().map((f) => {
    return new Intl.NumberFormat("en", {
      minimumFractionDigits: 1,
      useGrouping: false,
    }).format(f);
  });

export const frequencyCommandArb = () => frequencyStringArb();

// limit to 'reasonable' date ranges of qsos
const qsoDateRangeArb = () =>
  fc.date({ min: new Date("1900-01-01"), max: new Date("2100-01-01") });

export const dateArb = () =>
  qsoDateRangeArb().map((d) => format(d, "yyyyMMdd"));
export const timeWithoutSeconds = () =>
  qsoDateRangeArb().map((d) => format(d, "HHmm"));
export const timeWithSecondsArb = () =>
  qsoDateRangeArb().map((d) => format(d, "HHmmss"));
export const dateCmdArb = generateCmdArb("date", dateArb);

export const timeOnCmdArb = () =>
  fc.oneof(
    timeWithoutSeconds(),
    timeWithoutSeconds().map((time) => `timeon ${time}`),
    timeWithSecondsArb().map((time) => `timeon ${time}`)
  );

const prefixArb = () => fc.constantFrom("A", "VK", "VJ", "ZL", "9M", "4Z");

const alphaArb = () =>
  fc.constantFrom(
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

const locatorArb = () => prefixArb().map((prefix) => `${prefix}/`);
const suffixArb = () =>
  fc.constantFrom("P", "M", "QRP", 2).map((suffix) => `/${suffix}`);

export const callsignArb = () =>
  fc
    .tuple(
      fc.option(locatorArb()),
      prefixArb(),
      fc.integer({ min: 0, max: 9 }),
      fc.stringOf(alphaArb(), { minLength: 1, maxLength: 4 }),
      fc.option(suffixArb())
    )
    .map((t) => t.join(""));

export const callCmdArb = generateCmdArb("call", callsignArb);
export const stationCmdArb = generateCmdArb("station", callsignArb);
export const operatorCmdArb = generateCmdArb("operator", callsignArb);

export const logEntryLineArb = () =>
  fc
    .tuple(callCmdArb(), timeOnCmdArb(), fc.array(commandArb()))
    .map(([call, timeOn, commands]) => [call, timeOn, ...commands].join(" "));

export const signalReportArb = () =>
  fc.oneof(
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

export const signalReportRcvdCmdArb = () =>
  signalReportArb().map((report) => `r${report}`);
export const signalReportSentCmdArb = () =>
  signalReportArb().map((report) => `s${report}`);

export const sotaRefArb = () =>
  fc
    .tuple(
      locatorArb(),
      fc.integer({ min: 0, max: 9 }),
      fc.stringOf(alphaArb(), { minLength: 1, maxLength: 3 }),
      fc.integer({ min: 1, max: 999 })
    )
    .map(([locator, regionNum, area, summitNum]) =>
      [locator, regionNum, "/", area, "-", summitNum].join("")
    );
const sotaCmdArb = generateCmdArb("sota", sotaRefArb);
const mySotaCmdArb = generateCmdArb("mysota", sotaRefArb);

export const wwffRefArb = () =>
  fc
    .tuple(fc.constantFrom("VK", "G"), fc.integer({ min: 0, max: 9999 }))
    .map((t) => t.join("-"));

const wwffCmdArb = generateCmdArb("wwff", wwffRefArb);
const mywwffCmdArb = generateCmdArb("mywwff", wwffRefArb);

export const potaRefArb = () =>
  fc
    .tuple(fc.constantFrom("VK", "ZL"), fc.integer({ min: 0, max: 9999 }))
    .map((t) => t.join("-"));
const potaCmdArb = generateCmdArb("pota", potaRefArb);
const mypotaCmdArb = generateCmdArb("mypota", potaRefArb);

const txPwrArb = () => fc.integer({ min: 1, max: 2000 });
const txPwrCmdArb = () => txPwrArb().map((pwr) => ["txpwr", pwr].join(" "));

const gridSquareLetterArb = () =>
  fc.constantFrom(
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
const gridsquareArb = () =>
  fc.oneof(
    fc
      .tuple(
        gridSquareLetterArb(),
        gridSquareLetterArb(),
        fc.integer({ min: 0, max: 9 }),
        fc.integer({ min: 0, max: 9 })
      )
      .map((t) => t.join("")),
    fc
      .tuple(
        gridSquareLetterArb(),
        gridSquareLetterArb(),
        fc.integer({ min: 0, max: 9 }),
        fc.integer({ min: 0, max: 9 }),
        gridSquareLetterArb(),
        gridSquareLetterArb()
      )
      .map((t) => t.join(""))
  );

const gridsquareCmdArb = generateCmdArb("gridsquare", gridsquareArb);
const mygridsquareCmdArb = generateCmdArb("mygridsquare", gridsquareArb);
export const commandArb = () =>
  fc.oneof(
    frequencyCommandArb(),
    callCmdArb(),
    timeOnCmdArb(),
    modeCmdArb(),
    stationCmdArb(),
    operatorCmdArb(),
    dateCmdArb(),
    signalReportRcvdCmdArb(),
    signalReportSentCmdArb(),
    sotaCmdArb(),
    mySotaCmdArb(),
    wwffCmdArb(),
    mywwffCmdArb(),
    potaCmdArb(),
    mypotaCmdArb(),
    txPwrCmdArb(),
    gridsquareCmdArb(),
    mygridsquareCmdArb()
  );

export const parserContactArb = (): fc.Arbitrary<ParserContact> =>
  fc
    .tuple(
      fc.record<ParserContact>({
        call: callsignArb(),
        stationCallsign: callsignArb(),
        qsoDate: dateArb(),
        timeOn: fc.oneof(timeWithSecondsArb(), timeWithSecondsArb()),
        band: fc.constantFrom(...bands),
        mode: modeArb(),
        freq: frequencyArb(),
        rstSent: signalReportArb(),
        rstRcvd: signalReportArb(),
      })
    )
    .map(([record]) => record);
