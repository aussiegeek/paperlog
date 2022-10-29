import {
  nonempty,
  type,
  string,
  validate,
  StructError,
  instance,
} from "superstruct";
import { lexer } from "./lexer";
import { ParsingError, Token } from "tokenizr";
import { Date, Time, ModeEnum } from "./adif/types";
import { AdifRecord, adifRecordKeys } from "./adif/adifRecord";
import { camelCase } from "change-case";
import Decimal from "decimal.js";
import { presence } from "./presence";

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
  Field = "field",
}

// only the fields we require for a paperlog format contact
const ValidatedAdifRecord = type({
  qsoDate: Date,
  timeOn: Time,
  stationCallsign: nonempty(string()),
  call: nonempty(string()),
  mode: ModeEnum,
  freq: instance(Decimal),
});

export interface ParserFailure {
  line: string;
  error: ParsingError;
}
export interface ValidationFailure {
  error: StructError;
  line: string;
}

export interface ParseSuccess {
  contact: AdifRecord;
}

export type ParseResult = ParseSuccess | ParserFailure | ValidationFailure;

// returns input, unless input is case insensitive equal to reset
// allows for when a log part way through has no award ref (eg. left a sota summit and now only activating a park)
function parseFieldWithReset<T>(value: T): T | undefined {
  if (typeof value == "string" && value.toUpperCase() == "RESET") {
    return undefined;
  }

  return value;
}

export function parse(input: string): Array<ParseResult> {
  const contacts: Array<ParseResult> = [];
  const template: AdifRecord = {};
  input.split("\n").forEach((line) => {
    const record: AdifRecord = {};
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
            template.operator = parseFieldWithReset(token.value.toUpperCase());
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
            template.mySotaRef = parseFieldWithReset(token.value);
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
            template.myWwffRef = parseFieldWithReset(token.value);
            break;
          case "pota":
            record["appPaperlogPotaRef"] = token.value;
            break;
          case "mypota":
            template["appPaperlogMyPotaRef"] = parseFieldWithReset(token.value);
            break;
          case "gridsquare":
            record.gridsquare = token.value;
            break;
          case "myGridsquare":
            template.myGridsquare = parseFieldWithReset(token.value);
            break;
          case "txPwr":
            template.txPwr = parseFieldWithReset(token.value);
            break;
          case "field":
            if (
              // @ts-expect-error yes we can check if this list contains this field
              adifRecordKeys.includes(camelCase(token.value[0])) ||
              camelCase(token.value[0]).startsWith("app")
            ) {
              // @ts-expect-error it really does start with app, and so is safe to proceed
              record[camelCase(token.value[0])] = token.value[1];
            }
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
    } catch (error: unknown) {
      if (error instanceof ParsingError) {
        contacts.push({ line, error });
      } else {
        throw error;
      }
    }

    const newRecord = { ...template, ...record };

    const [err, validatedRecord] = validate(newRecord, AdifRecord, {
      coerce: true,
    });

    // if parsed as a AdifRecord
    if (validatedRecord) {
      if (validatedRecord.call && validatedRecord.call.length > 0) {
        // now see if it validated for paperlog format contact too
        const [err] = validate(newRecord, ValidatedAdifRecord);
        if (err) {
          contacts.push({ error: err, line });
        } else {
          contacts.push({ contact: presence(validatedRecord) });
        }
      }
    } else if (newRecord.call?.length && newRecord.call.length > 0) {
      contacts.push({ error: err, line });
    }
  });

  return contacts;
}

function parseMode(token: Token, template: Partial<AdifRecord>) {
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

function parseFreq(token: Token, template: Partial<AdifRecord>) {
  const freq = new Decimal(token.value);
  template.freq = freq;

  // bands.forEach((band) => {
  //   if (
  //     new Decimal(bandRange[band].from).lte(freq) &&
  //     new Decimal(bandRange[band].to).gte(freq)
  //   ) {
  //     template.band = band;
  //   }
  // });
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
