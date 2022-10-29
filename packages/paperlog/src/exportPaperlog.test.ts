import type { AdifFile } from "./adif";
import { exportPaperlog } from "./exportPaperlog";
import Decimal from "decimal.js";
import type { AdifRecord } from "./adif/adifRecord";

describe("exportPaperlog", () => {
  test.each<[AdifRecord[], string]>([
    [[{ call: "N3TJ" }], "call N3TJ"],
    [[{ stationCallsign: "VK3TCP" }], "station VK3TCP"],
    [[{ operator: "AAA" }], "operator AAA"],
    [[{ name: "Alice" }], "[name] Alice"],
    [[{ freq: new Decimal(7.032) }], "7.032"],
    [[{ freq: new Decimal(7) }], "7.0"],
    [[{ rig: "Icom 7300" }], `[rig] "Icom 7300"`],
    [
      [{ call: "N3TJ" }, { stationCallsign: "VK3TCP" }],
      `call N3TJ\nstation VK3TCP`,
    ],
    [
      [
        { call: "VK3PRG", stationCallsign: "N3TJ" },
        { call: "K3PRG", stationCallsign: "N3TJ" },
      ],
      `call VK3PRG station N3TJ\ncall K3PRG`,
    ],
    [[{ gridsquare: undefined }], ""],
  ])("map %j to `%s`", (record, expected) => {
    const adifFile: AdifFile = {
      records: record,
    };

    expect(expected).toEqual(exportPaperlog(adifFile));
  });
});
