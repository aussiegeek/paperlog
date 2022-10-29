import type { AdifFile } from "./adif";
import type { AdifRecord } from "./adif/adifRecord";
import Decimal from "decimal.js";
import { withDecimalStr } from "./withDecimalStr";
import { isPresent } from "./isPresent";

export function exportPaperlog(adifFile: AdifFile): string {
  return adifFile.records.map(serializeRecord).join("\n");
}

const fieldMappings: Record<string, string> = {
  call: "call",
  freq: "freq",
  gridsquare: "gridsquare",
  mode: "mode",
  myGridsquare: "mygridsquare",
  mySotaRef: "mysota",
  myWwffRef: "mywwff",
  operator: "operator",
  qsoDate: "date",
  sotaRef: "sota",
  stationCallsign: "station",
  timeOn: "timeOn",
  txPwr: "txpwr",
  wwffRef: "wwff",
};

function mapField(field: string) {
  const mapping = fieldMappings[field];

  if (mapping) {
    return mapping;
  } else {
    return `[${field}]`;
  }
}

function serializeValue(value: unknown): string {
  if (value instanceof Decimal) {
    return withDecimalStr(value);
  } else if (typeof value === "string" && value.indexOf(" ") >= 0) {
    return `"${value}"`;
  } else if (typeof value == "number") {
    return value.toString();
  } else if (typeof value == "boolean") {
    return value ? "Y" : "N";
  } else if (typeof value == "string") {
    return value;
  }
  throw new Error(`Unhandled value ${value}`);
}

function serializeRecord(
  adifRecord: AdifRecord,
  index: number,
  array: AdifRecord[]
) {
  const prev = array[index - 1];
  const current = array[index];

  const serializedFields = Object.entries(adifRecord)
    .map((f) => serializeField(f, prev, current))
    .join(" ")
    .trim();

  return [serializedFields, resetFields(prev, current)].join(" ").trim();
}

const templateFields: Array<keyof AdifRecord> = [
  "stationCallsign",
  "operator",
  "txPwr",
  "myWwffRef",
  "myGridsquare",
  "mySotaRef",
  "mode",
];
function serializeField(
  [field, value]: [string, unknown],
  prev: AdifRecord | undefined,
  current: AdifRecord | undefined
) {
  const templateFieldName = templateFields.find((t) => t == field);
  if (prev && current && templateFieldName) {
    if (prev[templateFieldName] == current[templateFieldName]) {
      return "";
    }
  }
  if (field == "freq" && value instanceof Decimal) {
    const result = serializeValue(value);
    return result;
  } else if (typeof value == "undefined") {
    return "";
  } else if (field == "rstSent" && typeof value == "string") {
    return `s${value}`;
  } else if (field == "rstRcvd" && typeof value == "string") {
    return `r${value}`;
  }
  return `${mapField(field)} ${serializeValue(value)}`;
}

// generate reset commands for when the previous line has a template field, and the current doesn't
function resetFields(
  prev: AdifRecord | undefined,
  current: AdifRecord | undefined
) {
  if (!prev || !current) {
    return "";
  }

  return templateFields
    .map((fieldName) => {
      if (prev[fieldName] && !current[fieldName]) {
        return serializeField([fieldName, "reset"], prev, current);
      } else {
        return "";
      }
    })
    .join(" ")
    .trim();
}
