import {
  Infer,
  nonempty,
  number,
  object,
  optional,
  pick,
  string,
  validate,
  assign,
  StructError,
} from "superstruct";
import { BandEnum, bandRange, bands } from "./adif/bands";
import { lexer } from "./lexer";
import { ParsingError, Token } from "tokenizr";
import { Date, Time } from "./adif/types";
import { ModeEnum } from "./adif/modes";
import { AdifRecord } from "./adif/adifRecord";

export enum Command {
  Station = "station",
  Operator = "operator",
  Call = "call",
  Date = "date",
  Freq = "freq",
  Mode = "mode",
  TimeOn = "timeOn",
  RstSent = "rst_sent",
  RstRcvd = "rst_rcvd",
  NewLine = "newline",
  EOF = "EOF",
  Sota = "sota",
  MySota = "mysota",
  Wwff = "wwff",
  MyWwff = "mywwff",
  Pota = "pota",
  MyPota = "mypota",
  GridSquare = "gridsquare",
  MyGridSquare = "myGridsquare",
  TxPwr = "txPwr",
}

export const ParserContact = assign(
  object({
    qsoDate: Date,
    timeOn: Time,
    stationCallsign: nonempty(string()),
    operator: optional(string()),
    call: nonempty(string()),
    band: optional(BandEnum),
    mode: ModeEnum,
    submode: optional(string()),
    freq: number(),
    rstSent: optional(string()),
    rstRcvd: optional(string()),
    sotaRef: optional(string()),
    mySotaRef: optional(string()),
    wwffRef: optional(string()),
    myWwffRef: optional(string()),
    potaRef: optional(string()),
    myPotaRef: optional(string()),
  }),
  pick(AdifRecord, ["gridsquare", "myGridsquare", "txPwr"])
);

export type ParserContact = Infer<typeof ParserContact>;
export interface ParserFailure {
  line: string;
  error: ParsingError;
}
export interface ValidationFailure {
  error: StructError;
  line: string;
}

export interface ParseSuccess {
  contact: ParserContact;
}

export type ParseResult = ParseSuccess | ParserFailure | ValidationFailure;

// returns input, unless input is case insensitive equal to reset
// allows for when a log part way through has no award ref (eg. left a sota summit and now only activating a park)
function parseAwardRefWithReset(ref: string): string | undefined {
  return ref.toUpperCase() == "RESET" ? undefined : ref;
}

export function parse(input: string): Array<ParseResult> {
  const contacts: Array<ParseResult> = [];
  const template: Partial<ParserContact> = {};
  input.split("\n").forEach((line) => {
    const record: Partial<ParserContact> = {};
    lexer.input(line);
    // lexer.debug(true);
    try {
      lexer.tokens().forEach((token) => {
        // console.log(token.toString());
        // todo: better type catching
        const type = token.type as Command;
        switch (type) {
          case "station":
            template.stationCallsign = token.value.toUpperCase();
            break;
          case "operator":
            template.operator = token.value.toUpperCase();
            break;
          case "call":
            record.call = token.value.toUpperCase();
            break;
          case "date":
            template.qsoDate = token.value;
            break;
          case "timeOn":
            template.timeOn = token.value;
            break;
          case "freq":
            parseFreq(token, template);
            break;
          case "mode":
            parseMode(token, template);
            break;
          case "mysota":
            template.mySotaRef = parseAwardRefWithReset(token.value);
            break;
          case "sota":
            record.sotaRef = token.value;
            break;
          case "rst_sent":
            record.rstSent = token.value;
            break;
          case "rst_rcvd":
            record.rstRcvd = token.value;
            break;
          case "wwff":
            record.wwffRef = token.value;
            break;
          case "mywwff":
            template.myWwffRef = parseAwardRefWithReset(token.value);
            break;
          case "pota":
            record.potaRef = token.value;
            break;
          case "mypota":
            template.myPotaRef = parseAwardRefWithReset(token.value);
            break;
          case "gridsquare":
            template.gridsquare = token.value;
            break;
          case "myGridsquare":
            template.myGridsquare = token.value;
            break;
          case "txPwr":
            template.txPwr = token.value;
            break;

          case "EOF":
            break;
          default:
            // const exhaustiveCheck: never = type;
            // Type 'MyEnum' is not assignable to type 'never'.ts(2322)
            // const exhaustiveCheck: never
            console.warn(`Unknown token: "${token}`);

          // throw new Error(`Unhandled command: ${exhaustiveCheck}`);
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof ParsingError) {
        contacts.push({ line, error });
      } else {
        console.error(error.toString());
        throw error;
      }
    }

    const newRecord = { ...template, ...record };

    const [err, validatedRecord] = validate(newRecord, ParserContact, {
      coerce: true,
    });

    if (validatedRecord) {
      contacts.push({ contact: validatedRecord });
    } else if (newRecord.call?.length && newRecord.call.length > 0) {
      contacts.push({ error: err, line });
    }
  });

  return contacts;
}

function parseMode(token: Token, template: Partial<ParserContact>) {
  const mode = token.value;
  template.mode = mode;
  if (mode == "CW") {
    template.rstRcvd = "599";
    template.rstSent = "599";
  } else {
    template.rstRcvd = "59";
    template.rstSent = "59";
  }
}

function parseFreq(token: Token, template: Partial<ParserContact>) {
  const freq = parseFloat(token.value);
  template.freq = freq;

  bands.forEach((band) => {
    if (bandRange[band].from <= freq && bandRange[band].to >= freq) {
      template.band = band;
    }
  });
}

export function collectGlobalErrors(results: ParseResult[]) {
  // see if there are any global errors, and return them early
  const globalError = results.find(
    (r) => "error" in r && r.error instanceof StructError
  );

  const messages: Record<string, string> = {};

  if (
    globalError &&
    "error" in globalError &&
    globalError.error instanceof StructError
  ) {
    const failures = globalError.error.failures();

    failures.forEach((failure) => {
      if (typeof failure.value === "undefined") {
        switch (failure.key) {
          case "qsoDate":
            messages["qsoDate"] =
              "No date command found. Try adding `date 20221114`";
            break;
          case "freq":
            messages["freq"] = "Frequency not set, for 7.032MHz add `7.032`";
            break;
          case "mode":
            messages["mode"] = "Mode not set, try `mode cw` or `mode ssb`";
            break;
          case "stationCallsign":
            messages["stationCallsign"] =
              "Station (your callsign) not set, add `station VK1ABC`";
            break;
        }
      }
    });
  }

  if (Object.values(messages).length > 0) {
    return Object.entries(messages)
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([_key, value]) => value);
  }
  return [];
}

export function validationMessagesForResult(result: ParseResult) {
  const messages: string[] = [];
  if ("error" in result) {
    const error = result.error;
    if (error instanceof StructError) {
      const failures = error.failures();
      failures.forEach((failure) => {
        if (typeof failure.value === "undefined") {
          switch (failure.key) {
            case "timeOn":
              messages.push("Time on can't be blank use `0123` for 0123UTC");
              break;
            default:
              messages.push(JSON.stringify(failure));
          }
        } else {
          messages.push(JSON.stringify(failure));
        }
      });
    } else {
      messages.push(
        `Unrecognised token starting at \`${error.input.substring(
          error.column - 1
        )}\``
      );
    }
  }

  return messages;
}
