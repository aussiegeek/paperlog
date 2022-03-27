import { snakeCase } from "snake-case";
import {
  Infer,
  nonempty,
  number,
  object,
  optional,
  pattern,
  string,
} from "superstruct";
import { BandEnum } from "./bands";
export interface AdifFile {
  records: AdifRecord[];
}

export const AdifDate = pattern(string(), /^\d{8}$/);
export const AdifTime = pattern(string(), /^[0-2][0-9][0-5][0-9]$/);

export const AdifRecord = object({
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
  sig: optional(string()),
  sigInfo: optional(string()),
  mySig: optional(string()),
  mySigInfo: optional(string()),
});
export type AdifRecord = Infer<typeof AdifRecord>;

type AdifTime = string;
type AdifDate = string;

export function serialize(file: AdifFile): string {
  return file.records.map(serializeRecord).join("\n");
}

function valueLength(value: string | number | undefined) {
  if (typeof value === "string") {
    return `:${value.length}`;
  }

  if (typeof value === "number") {
    return `:${value.toString().length}`;
  }

  return "";
}
function serializeRecord(record: AdifRecord): string {
  const keys = Object.keys(record).sort();
  return (
    keys
      .map((key) => {
        // @ts-expect-error deal with record key annoyances
        const value = record[key];
        return `<${snakeCase(key)}${valueLength(value)}>${value}`;
      })
      .join("\n") + "\n<eor>\n"
  );
}
