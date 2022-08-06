import {
  Infer,
  is,
  nonempty,
  number,
  object,
  optional,
  string,
} from "superstruct";
import { BandEnum, bandRange, bands } from "./adif/bands";
import { lexer } from "./lexer";
import { ParsingError } from "tokenizr";
import { Date, Time } from "./adif/types";
import { ModeEnum } from "./adif/modes";

export enum Command {
  MyCall = "mycall",
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
}

export const ParserContact = object({
  qsoDate: Date,
  timeOn: Time,
  stationCallsign: nonempty(string()),
  call: nonempty(string()),
  band: BandEnum,
  mode: ModeEnum,
  submode: optional(string()),
  freq: number(),
  rstSent: string(),
  rstRcvd: string(),
  sotaRef: optional(string()),
  mySotaRef: optional(string()),
  wwffRef: optional(string()),
  myWwffRef: optional(string()),
  potaRef: optional(string()),
  myPotaRef: optional(string()),
});

export type ParserContact = Infer<typeof ParserContact>;
export interface ParserFailure {
  line: string;
  error: ParsingError;
}

export function parse(input: string): Array<ParserContact | ParserFailure> {
  const contacts: Array<ParserContact | ParserFailure> = [];
  const template: Partial<ParserContact> = {};
  input.split("\n").forEach((line) => {
    let record: Partial<ParserContact> = {};
    lexer.input(line);
    // lexer.debug(true);
    try {
      lexer.tokens().forEach((token) => {
        // console.log(token.toString());
        // todo: better type catching
        const type = token.type as Command;
        switch (type) {
          case "mycall":
            template.stationCallsign = token.value.toUpperCase();
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
            const freq = parseFloat(token.value);
            template.freq = freq;

            bands.forEach((band) => {
              if (bandRange[band].from <= freq && bandRange[band].to >= freq) {
                template.band = band;
              }
            });

            break;
          case "mode":
            const mode = token.value;
            template.mode = mode;
            if (mode == "CW") {
              template.rstRcvd = "599";
              template.rstSent = "599";
            } else {
              template.rstRcvd = "59";
              template.rstSent = "59";
            }
            break;
          case "mysota":
            template.mySotaRef = token.value;
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
            template.myWwffRef = token.value;
            break;
          case "pota":
            record.potaRef = token.value;
            break;
          case "mypota":
            template.myPotaRef = token.value;
            break;
          case "EOF":
            break;
          default:
            // const exhaustiveCheck: never = type;
            // Type 'MyEnum' is not assignable to type 'never'.ts(2322)
            // const exhaustiveCheck: never
            console.log(token);

          // throw new Error(`Unhandled command: ${exhaustiveCheck}`);
        }
      });
    } catch (error: any) {
      if (error instanceof ParsingError) {
        contacts.push({ line, error });
      } else {
        console.error(error.toString());
        throw error;
      }
    }

    const newRecord = { ...template, ...record };
    if (is(newRecord, ParserContact)) {
      contacts.push(newRecord);
    }
  });

  return contacts;
}
