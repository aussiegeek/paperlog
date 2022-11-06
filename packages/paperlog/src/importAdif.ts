import { assert, create, string } from "superstruct";
import { AdifFile, adifHeader } from "./adif";
import { AdifRecord } from "./adif/adifRecord";
import { camelCase } from "change-case";
import { presence } from "./presence";

export function importAdif(adifStr: string): AdifFile {
  // get text header which can be anything before the first less than symbol (<)
  const fieldsStart = adifStr.indexOf("<");

  let header;
  let fieldStr = adifStr;
  if (fieldsStart > 0) {
    const h: Record<string, string> = {};
    h["text"] = adifStr.substring(0, fieldsStart);

    const eohPos = adifStr.indexOf("eoh");
    const headerFieldsStr = adifStr.substring(fieldsStart, eohPos - 1);
    fieldList(headerFieldsStr).forEach(({ field, value }) => {
      h[camelCase(field)] = value;
    });

    header = create(h, adifHeader);

    fieldStr = adifStr.substring(eohPos + 5);
  }

  const records: AdifRecord[] = [];
  let record: Record<string, unknown> = {};

  fieldList(fieldStr).forEach(({ field, value }) => {
    if (field.toLowerCase() === "eor") {
      const r = presence(create(record, AdifRecord));
      assert(r, AdifRecord);
      records.push(r);
      record = {};
    } else {
      if (typeof value == "string" && value.trim().length == 0) {
        return;
      }
      record[camelCase(field)] = value;
    }
  });

  return { header, records };
}

interface ParsedField {
  field: string;
  value: string;
}
// split each field / value combo at a simple parser level
// <eor> won't be special cased here, just a field wtih no value
function fieldList(fieldStr: string): Array<ParsedField> {
  const fields: Array<ParsedField> = [];

  fieldStr.split("\n").forEach((line, _lineNo) => {
    let i = line.indexOf("<");
    if (line.trim().length > 0) {
      while (i >= 0) {
        const nextField = line.indexOf("<", i + 1);

        const fieldEnd = line.indexOf(">", i);
        const fieldParts = line.substring(i + 1, fieldEnd);

        const [field] = fieldParts.split(":");

        assert(field, string());

        const value = line
          .substring(fieldEnd + 1, nextField > 0 ? nextField : undefined)
          .trim();

        fields.push({ field, value });

        i = nextField;
      }
    }
  });

  return fields;
}
