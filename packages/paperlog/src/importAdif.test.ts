import fc from "fast-check";
import type { AdifFile } from "./adif";
import { importAdif } from "./importAdif";
import { adifFileStrArb } from "./testArbitaries";
import Decimal from "decimal.js";

describe("adifImport", () => {
  test("import basic adif file", () => {
    const content = `<call:6>VK3PSH <qso_date:8>20210830 <time_on:6>222345 <band:3>40m <freq:8>7.074800 <mode:3>FT8 <rst_sent:3>-06 <rst_rcvd:3>-21 <qsl_rcvd:1>N <qsl_sent:1>R <dxcc:3>150 <cqz:2>30 <ituz:2>59 <cont:2>OC <gridsquare:4>QF22 <tx_pwr:1>5  <eqsl_qsl_rcvd:1>N <eqsl_qsl_sent:1>N <lotw_qsl_rcvd:1>N <lotw_qsl_sent:1>N <pfx:3>VK3 <clublog_qso_upload_status:1>Y <eor>
<call:6>VK4OBI <gridsquare:4>QG48 <mode:3>FT8 <rst_sent:3>+01 <rst_rcvd:3>-08 <qso_date:8>20221025 <time_on:6>131230 <qso_date_off:8>20221025 <time_off:6>131330 <band:3>20m <freq:9>14.076153 <station_callsign:6>VK3TCP <my_gridsquare:6>QF22ID <tx_pwr:2>10 <eor>
    `;

    const expected: AdifFile = {
      header: undefined,
      records: [
        {
          call: "VK3PSH",
          qsoDate: "20210830",
          txPwr: new Decimal(5),
          timeOn: "222345",
          rstRcvd: "-21",
          rstSent: "-06",
          mode: "FT8",
          band: "40m",
          cqz: 30,
          freq: new Decimal(7.0748),
          gridsquare: "QF22",
          pfx: "VK3",
          ituz: 59,
          qslRcvd: "N",
          qslSent: "R",
          clublogQsoUploadStatus: "Y",
          cont: "OC",
          dxcc: "150",
          eqslQslRcvd: "N",
          eqslQslSent: "N",
          lotwQslRcvd: "N",
          lotwQslSent: "N",
        },
        {
          call: "VK4OBI",
          rstRcvd: "-08",
          rstSent: "+01",
          stationCallsign: "VK3TCP",
          timeOff: "131330",
          timeOn: "131230",
          gridsquare: "QG48",
          mode: "FT8",
          txPwr: new Decimal(10),
          freq: new Decimal(14.076153),
          band: "20m",
          myGridsquare: "QF22ID",
          qsoDate: "20221025",
          qsoDateOff: "20221025",
        },
      ],
    };
    expect(importAdif(content)).toStrictEqual(expected);
  });

  test("app defined fields", () => {
    const content = `<call>N3TJ<station_callsign>VK3TCP<app_paperlog_mypota>VK-0278<eor>`;
    const expected: AdifFile = {
      header: undefined,
      records: [
        {
          call: "N3TJ",
          stationCallsign: "VK3TCP",
          appPaperlogMypota: "VK-0278",
        },
      ],
    };
    expect(importAdif(content)).toStrictEqual(expected);
  });

  test("header", () => {
    const content = `ADIF Export
<adif_ver:5>3.1.1
<created_timestamp:15>20210830 222522
<programid:6>WSJT-X
<programversion:5>2.4.0
<eoh>
<call:6>VK3PSH <qso_date:8>20210830 <time_on:6>222345 <band:3>40m <freq:8>7.074800 <mode:3>FT8 <rst_sent:3>-06 <rst_rcvd:3>-21 <qsl_rcvd:1>N <qsl_sent:1>R <dxcc:3>150 <cqz:2>30 <ituz:2>59 <cont:2>OC <gridsquare:4>QF22 <tx_pwr:1>5 <eqsl_qsl_rcvd:1>N <eqsl_qsl_sent:1>N <lotw_qsl_rcvd:1>N <lotw_qsl_sent:1>N <pfx:3>VK3 <clublog_qso_upload_status:1>Y <eor>
`;

    const expected: AdifFile = {
      header: {
        text: "ADIF Export\n",
        adifVer: "3.1.1",
        createdTimestamp: "20210830 222522",
        programid: "WSJT-X",
        programversion: "2.4.0",
      },
      records: [
        {
          call: "VK3PSH",
          qsoDate: "20210830",
          txPwr: new Decimal(5),
          timeOn: "222345",
          rstRcvd: "-21",
          rstSent: "-06",
          mode: "FT8",
          band: "40m",
          cqz: 30,
          freq: new Decimal(7.0748),
          gridsquare: "QF22",
          pfx: "VK3",
          ituz: 59,
          qslRcvd: "N",
          qslSent: "R",
          clublogQsoUploadStatus: "Y",
          cont: "OC",
          dxcc: "150",
          eqslQslRcvd: "N",
          eqslQslSent: "N",
          lotwQslRcvd: "N",
          lotwQslSent: "N",
        },
      ],
    };
    expect(importAdif(content)).toStrictEqual(expected);
  });

  test("random wsjx log", () => {
    const content = `<call:6>VK3PSH <qso_date:8>20210830 <time_on:6>222345 <band:3>40m <freq:8>7.074800 <mode:3>FT8 <rst_sent:3>-06 <rst_rcvd:3>-21 <app_rumlog_qsl:1>W <qsl_rcvd:1>N <qsl_sent:1>R <dxcc:3>150 <cqz:2>30 <ituz:2>59 <cont:2>OC <gridsquare:4>QF22 <tx_pwr:1>5 <app_rumlog_power:1>5 <eqsl_qsl_rcvd:1>N <eqsl_qsl_sent:1>N <lotw_qsl_rcvd:1>N <lotw_qsl_sent:1>N <pfx:3>VK3 <clublog_qso_upload_status:1>Y <app_rumlog_colorcode:1>0 <eor>
    `;

    const expected: AdifFile = {
      header: undefined,
      records: [
        {
          call: "VK3PSH",
          qsoDate: "20210830",
          txPwr: new Decimal(5),
          timeOn: "222345",
          rstRcvd: "-21",
          rstSent: "-06",
          mode: "FT8",
          band: "40m",
          cqz: 30,
          freq: new Decimal(7.0748),
          gridsquare: "QF22",
          pfx: "VK3",
          ituz: 59,
          qslRcvd: "N",
          qslSent: "R",
          clublogQsoUploadStatus: "Y",
          cont: "OC",
          dxcc: "150",
          eqslQslRcvd: "N",
          eqslQslSent: "N",
          lotwQslRcvd: "N",
          lotwQslSent: "N",
          appRumlogColorcode: "0",
          appRumlogPower: "5",
          appRumlogQsl: "W",
        },
      ],
    };

    expect(importAdif(content)).toStrictEqual(expected);
  });

  test("handle zero length adif field", () => {
    const content = `<call:6>HP3AXL <gridsquare:0> <mode:3>FT8 <rst_sent:3>-17 <rst_rcvd:3>-16 <qso_date:8>20220522 <time_on:6>023030 <qso_date_off:8>20220522 <time_off:6>023229 <band:3>15m <freq:9>21.075908 <station_callsign:6>VK3TCP <my_gridsquare:6>QF22ei <tx_pwr:2>10 <eor>`;

    const expected: AdifFile = {
      header: undefined,
      records: [
        {
          freq: new Decimal(21.075908),
          stationCallsign: "VK3TCP",
          band: "15m",
          call: "HP3AXL",
          mode: "FT8",
          myGridsquare: "QF22ei",
          qsoDate: "20220522",
          qsoDateOff: "20220522",
          timeOn: "023030",
          timeOff: "023229",
          txPwr: new Decimal(10),
          rstRcvd: "-16",
          rstSent: "-17",
        },
      ],
    };

    expect(importAdif(content)).toStrictEqual(expected);
  });

  test("property test import", () => {
    fc.assert(
      fc.property(adifFileStrArb, (adifFileContent) => {
        expect(() => importAdif(adifFileContent)).not.toThrow();
      })
    );
  });
});
