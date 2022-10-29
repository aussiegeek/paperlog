import { snakeCase } from "snake-case";
import { Infer, object, partial, string } from "superstruct";
import { version } from ".";
import type { AdifRecord } from "./adif/adifRecord";
import Decimal from "decimal.js";
export interface AdifFile {
  header?: AdifHeader | undefined;
  records: AdifRecord[];
}

export const adifHeader = partial(
  object({
    text: string(),
    adifVer: string(),
    createdTimestamp: string(),
    programid: string(),
    programversion: string(),
  })
);

export type AdifHeader = Infer<typeof adifHeader>;

export const adifVersion = "3.1.3";

export function defaultHeader(): AdifHeader {
  return {
    text: "https://github.com/aussiegeek/paperlog",
    adifVer: adifVersion,
    programid: "paperlog",
    programversion: version,
  };
}
export function serialize(file: AdifFile): string {
  return (
    serializeHeaders(file.header) + file.records.map(serializeRecord).join("\n")
  );
}

function serializeHeaders(header: AdifHeader | undefined) {
  if (!header) {
    return "";
  }
  const { text, ...rest } = header;
  const serialiedHeaderFields =
    Object.entries(rest)
      .map(([field, value]) => `<${snakeCase(field)}>${value}`)
      .join("") + "<eoh>\n";

  return headerText(text) + serialiedHeaderFields;
}

function headerText(text: string | undefined) {
  if (typeof text === "string" && text.length > 0) {
    return text + "\n";
  } else {
    return " ";
  }
}

export function valueLength(
  value: string | number | boolean | undefined | unknown
) {
  if (typeof value === "string") {
    return `:${value.length}`;
  }

  if (value instanceof Decimal || typeof value === "number") {
    return `:${value.toString().length}`;
  }

  return "";
}

function serializeRecord(record: AdifRecord): string {
  return (
    Object.entries(record)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => {
        if (value === undefined) {
          return undefined;
        }
        return `<${snakeCase(key)}${valueLength(value)}>${value}`;
      })
      .join("") + "<eor>"
  );
}
