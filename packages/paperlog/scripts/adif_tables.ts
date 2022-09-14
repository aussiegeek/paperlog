import Papa from "papaparse";
import * as fs from "fs";
import prettier from "prettier";
import { camelCase } from "camel-case";

function parseFile<T>(filename: string) {
  const data = fs.readFileSync(`${__dirname}/../adif_csv/${filename}`, "utf8");
  const result = Papa.parse<T>(data, { header: true, skipEmptyLines: true });
  if (result.errors.length > 0) {
    console.error("Error parsing file", filename, result.errors);
    process.exit(1);
  }
  return result;
}

function writeTypes(filename: string, contents: string) {
  try {
    const formatted = prettier.format(contents, { parser: "typescript" });
    fs.writeFileSync(`${__dirname}/../src/adif/${filename}`, formatted);
  } catch (e) {
    console.log(contents);
    console.error("Error writing file", filename, e);
    process.exit(1);
  }
}

function parseBands() {
  const result = parseFile<{
    "Enumeration Name": string;
    Band: string;
    "Lower Freq (MHz)": string;
    "Upper Freq (MHz)": string;
    "Import-only": string;
    Comments: string;
    "ADIF Version": string;
    "ADIF Status": string;
  }>("enumerations_band.csv");

  const bandData: Record<string, object> = {};

  result.data.forEach((data) => {
    const band = data["Band"];

    bandData[band] = {
      from: Number.parseFloat(data["Lower Freq (MHz)"]),
      to: Number.parseFloat(data["Upper Freq (MHz)"]),
    };

    const output = `
    // generated by scripts/adif_tables.ts
    import { enums } from "superstruct";

    export const bands = ${JSON.stringify(Object.keys(bandData))} as const;

    type BandRange = { [K in typeof bands[number]]: { from: number; to: number } };
    const bandData: BandRange = ${JSON.stringify(bandData)};

    export const BandEnum = enums(bands);

    export const bandRange: BandRange = bandData;
    `;
    writeTypes("bands.ts", output);
  });
}

function adifRecord() {
  const result = parseFile<{
    "Field Name": string;
    "Data Type": string;
    Enumeration: string;
    Description: string;
    "Header Field": string;
    "Minimum Value": string;
    "Maximum Value": string;
    "Import-only": string;
    Comments: string;
  }>("fields.csv");

  const excludeFieldsFilter = [
    "ANT_PATH",
    "CLUBLOG_QSO_UPLOAD_DATE",
    "CLUBLOG_QSO_UPLOAD_STATUS",
    "EQSL_QSL_SENT",
    "HRDLOG_QSO_UPLOAD_STATUS",
    "PROP_MODE",
    "QRZCOM_QSO_UPLOAD_STATUS",
    "QSL_SENT_VIA",
    "QSL_VIA",
    "QSO_COMPLETE",
    "REGION",
    "QSL_SENT",
    "QSL_RCVD_VIA",
    "QSL_RCVD",
    "QRZCOM_QSO_UPLOAD_DATE",
    "LOTW_QSLSDATE",
    "LOTW_QSL_SENT",
    "LOTW_QSL_RCVD",
    "LOTW_QSLRDATE",
    "HRDLOG_QSO_UPLOAD_DATE",
    "EQSL_QSL_RCVD",
    "EQSL_QSLSDATE",
    "EQSL_QSLRDATE",
    "DXCC",
    "DARC_DOK",
    "CONT",
    "ARRL_SECT",
    "MY_ARRL_SECT",
    "MY_DXCC",
    "AWARD_GRANTED",
    "AWARD_SUBMITTED",
    "CNTY",
    "CREDIT_GRANTED",
    "CREDIT_SUBMITTED",
    "MY_CNTY",
    "MY_STATE",
    "MY_USACA_COUNTIES",
    "MY_VUCC_GRIDS",
    "STATE",
    "USACA_COUNTIES",
    "VUCC_GRIDS",
  ];

  const fields: Record<
    string,
    { type: string; description: string; enumeration: string }
  > = {};
  result.data
    .filter((field) => field["Header Field"] != "Y")
    .forEach((data) => {
      fields[data["Field Name"]] = {
        type: data["Data Type"],
        description: data["Description"],
        enumeration: data["Enumeration"],
      };
    });

  const output = `
  // generated by scripts/adif_tables.ts
  import { optional, Infer, object } from "superstruct";
  import {
    Time,
    Date,
    Integer,
    PositiveInteger,
    Location,
    MultilineString,
    IntlMultilineString,
    String,
    IntlString,
    Number,
    Boolean,
    GridSquare,
    IOTARefNo,
    WWFFRef,
    SOTARef,
  } from "./types";
  import { BandEnum } from "./bands";
  import { ModeEnum } from "./modes";

  export const adifRecordKeys = ${JSON.stringify(
    Object.keys(fields)
      .filter((k) => !excludeFieldsFilter.includes(k))
      .map((k) => camelCase(k))
  )};

  export const AdifRecord = object({
    ${Object.entries(fields)
      .reduce<string[]>((acc, [key, field]) => {
        const { type, description } = field;
        const excludeField = !excludeFieldsFilter.includes(key);
        const commented = excludeField ? "" : "// ";

        const mappedType = excludeField ? mapAdifType(key, field) : type;
        const line = `${commented}${camelCase(key)}: ${mappedType},`;
        return [...acc, `// ${description}`, line, ""];
      }, [])
      .join("\n")}
  });

  export type AdifRecord = Infer<typeof AdifRecord>;

  `;

  writeTypes("adifRecord.ts", output);
}

function mapAdifType(
  key: string,
  {
    type,
    enumeration,
  }: {
    type: string;
    enumeration: string;
  }
) {
  switch (type) {
    case "Enumeration":
      return `optional(${enumeration}Enum)`;

    // fallthrough to types defined in types.ts
    case "Boolean":
    case "Date":
    case "GridSquare":
    case "Integer":
    case "IntlMultilineString":
    case "IntlString":
    case "IOTARefNo":
    case "Location":
    case "MultilineString":
    case "Number":
    case "PositiveInteger":
    case "SOTARef":
    case "String":
    case "Time":
    case "WWFFRef":
      return `optional(${type})`;

    default:
      console.error(`Unknown type for field ${key}`, type);
      process.exit(1);
  }
}

function parseModes() {
  const result = parseFile<{
    Mode: string;
    Submodes: string;
    Description: string;
  }>("enumerations_mode.csv");

  const modeData: Record<string, { description: string }> = {};

  result.data.forEach((data) => {
    const mode = data["Mode"];

    modeData[mode] = {
      description: data["Description"],
    };

    const output = `
    // generated by scripts/adif_tables.ts
    import { enums } from "superstruct";

    export const modes = [
      ${Object.entries(modeData)
        .reduce<string[]>((acc, [key, mode]) => {
          const description =
            mode.description.length > 0 ? `// ${mode.description}` : "";
          return [...acc, `"${key}", ${description}`];
        }, [])
        .join("\n")}
      ] as const;




    export const ModeEnum = enums(modes);

    `;
    writeTypes("modes.ts", output);
  });
}

parseBands();
adifRecord();
parseModes();
