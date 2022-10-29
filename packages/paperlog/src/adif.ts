import { snakeCase } from "snake-case";
import { Infer, object, partial, string } from "superstruct";
import { version } from ".";
import { AdifRecord, adifRecordKeys } from "./adif/adifRecord";
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

export function serialize(file: AdifFile): string {
  const header = `https://github.com/aussiegeek/paperlog\n<adif_ver>${adifVersion}<programid>paperlog<programversion>${version}<eoh>\n`;
  return header + file.records.map(serializeRecord).join("\n");
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
  return (
    adifRecordKeys
      .map((key) => {
        // @ts-expect-error deal with record key annoyances
        const value = record[key];
        if (value === undefined) {
          return undefined;
        }
        return `<${snakeCase(key)}${valueLength(value)}>${value}`;
      })
      .join("") + "<eor>"
  );
}
