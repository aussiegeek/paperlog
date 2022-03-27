import { AdifDate, AdifTime } from "./adif";
import Tokenizr from "tokenizr";
import {
  Infer,
  is,
  nonempty,
  number,
  object,
  optional,
  string,
} from "superstruct";
import { BandEnum, bandRange, bands } from "./bands";

enum Command {
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
  qsoDate: AdifDate,
  timeOn: AdifTime,
  stationCallsign: nonempty(string()),
  call: nonempty(string()),
  band: BandEnum,
  mode: string(),
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

let lexer = new Tokenizr();
lexer.rule(/mycall ([a-zA-Z0-9_]*)/, (ctx, match) => {
  ctx.accept(Command.MyCall, match[1]);
});

lexer.rule(/date (\d{8})/, (ctx, match) => {
  ctx.accept(Command.Date, match[1]);
});

lexer.rule(/\n/, (ctx) => ctx.accept("newline"));

lexer.rule(/(\d{1,2}\.\d+)/, (ctx, match) => {
  ctx.accept(Command.Freq, match[1]);
});

lexer.rule(/mode (cw|ssb)/, (ctx, match) => {
  ctx.accept(Command.Mode, match[1]?.toUpperCase());
});

lexer.rule(/cw/, (ctx) => {
  ctx.accept(Command.Mode, "CW");
});

lexer.rule(/([0-2][0-9][0-5][0-9])/, (ctx, match) => {
  ctx.accept(Command.TimeOn, match[1]);
});

lexer.rule(/call ([0-9a-z\/]+)/, (ctx, match) => {
  ctx.accept(Command.Call, match[1]);
});

lexer.rule(/s(\d+)/, (ctx, match) => {
  ctx.accept(Command.RstSent, match[1]);
});

lexer.rule(/r(\d+)/, (ctx, match) => {
  ctx.accept(Command.RstRcvd, match[1]);
});

lexer.rule(/sota ([a-zA-Z0-9\/\-]+)/, (ctx, match) => {
  ctx.accept(Command.Sota, match[1]?.toUpperCase());
});

lexer.rule(/mysota ([a-z0-9\/-]+)/, (ctx, match) => {
  ctx.accept(Command.MySota, match[1]?.toUpperCase());
});

lexer.rule(/wwff ([a-zA-Z0-9\-]+)/, (ctx, match) => {
  ctx.accept(Command.Wwff, match[1]?.toUpperCase());
});

lexer.rule(/mywwff ([a-zA-Z0-9-]+)/, (ctx, match) => {
  ctx.accept(Command.MyWwff, match[1]?.toUpperCase());
});

lexer.rule(/pota ([a-zA-Z0-9\-]+)/, (ctx, match) => {
  ctx.accept(Command.Pota, match[1]?.toUpperCase());
});

lexer.rule(/mypota ([a-zA-Z0-9-]+)/, (ctx, match) => {
  ctx.accept(Command.MyPota, match[1]?.toUpperCase());
});

lexer.rule(/ /, (ctx) => ctx.ignore());

export function parse(input: string): ParserContact[] {
  const contacts: ParserContact[] = [];
  lexer.input(input);
  // lexer.debug(true);
  try {
    const template: Partial<ParserContact> = {};
    let record: Partial<ParserContact> = {};
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
        case "newline":
        case "EOF":
          const newRecord = { ...template, ...record };
          if (is(newRecord, ParserContact)) {
            contacts.push(newRecord);
          }
          record = {};
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
        default:
          // const exhaustiveCheck: never = type;
          // Type 'MyEnum' is not assignable to type 'never'.ts(2322)
          // const exhaustiveCheck: never
          console.log(token);

        // throw new Error(`Unhandled command: ${exhaustiveCheck}`);
      }
    });

    const newRecord = { ...template, ...record };
    if (is(newRecord, ParserContact)) {
      contacts.push(newRecord);
    }
  } catch (ex: any) {
    console.log(ex.toString());
    throw ex;
  }

  return contacts;
}
