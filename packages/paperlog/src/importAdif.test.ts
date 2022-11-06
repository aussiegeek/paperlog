import fc from "fast-check";
import type { AdifFile } from "./adif";
import { importAdif } from "./importAdif";
import { adifFileStrArb } from "./testArbitaries";
import Decimal from "decimal.js";
import { presence } from "./presence";

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

  test("import from n1mm", () => {
    const content = `ADIF Export from N1MMLogger.net - Version 1.0.9688.0
Built: 10/18/2022 11:08:12 PM
VK3TCP logs generated @ 2022-11-04 05:14:45Z
Contest Name: OCEANIACW - 2022-10-08
<EOH>
<CALL:4>VK2W <QSO_DATE:8>20221008 <TIME_ON:6>083557 <TIME_OFF:6>083557 <BAND:3>40M <STATION_CALLSIGN:6>VK3TCP <FREQ:7>7.01610 <CONTEST_ID:13>Oceania-DX-CW <FREQ_RX:7>7.01610 <MODE:2>CW <RST_RCVD:3>599 <RST_SENT:3>599 <TX_PWR:2>10 <OPERATOR:6>VK3TCP <SRX:2>41 <CQZ:2>30 <STX:1>1 <APP_N1MM_POINTS:1>5 <APP_N1MM_RADIO_NR:1>1 <APP_N1MM_CONTINENT:2>OC <APP_N1MM_RUN1RUN2:1>1 <APP_N1MM_RADIOINTERFACED:1>1 <APP_N1MM_ISORIGINAL:4>True <APP_N1MM_NETBIOSNAME:14>ALANHARPERDC4A <APP_N1MM_ISRUNQSO:1>0 <PFX:3>VK2 <APP_N1MM_MULT1:1>1 <APP_N1MM_MULT2:1>0 <APP_N1MM_MULT3:1>0 <APP_N1MM_ID:32>095457c67f9d452eb24945bf46f863ba <APP_N1MM_CLAIMEDQSO:1>1 <EOR>
<CALL:8>VK3DPH/P <QSO_DATE:8>20221008 <TIME_ON:6>101925 <TIME_OFF:6>101925 <BAND:3>40M <STATION_CALLSIGN:6>VK3TCP <FREQ:7>7.02800 <CONTEST_ID:13>Oceania-DX-CW <FREQ_RX:7>7.02800 <MODE:2>CW <RST_RCVD:3>599 <RST_SENT:3>599 <TX_PWR:2>10 <OPERATOR:6>VK3TCP <SRX:1>1 <CQZ:2>30 <STX:1>2 <APP_N1MM_POINTS:1>5 <APP_N1MM_RADIO_NR:1>1 <APP_N1MM_CONTINENT:2>OC <APP_N1MM_RUN1RUN2:1>1 <APP_N1MM_RADIOINTERFACED:1>1 <APP_N1MM_ISORIGINAL:4>True <APP_N1MM_NETBIOSNAME:14>ALANHARPERDC4A <APP_N1MM_ISRUNQSO:1>0 <PFX:3>VK3 <APP_N1MM_MULT1:1>1 <APP_N1MM_MULT2:1>0 <APP_N1MM_MULT3:1>0 <APP_N1MM_ID:32>35e4b29d66f04665a753f8c161d7ffbd <APP_N1MM_CLAIMEDQSO:1>1 <EOR>
    `;

    const expected: AdifFile = {
      header: {
        text: `ADIF Export from N1MMLogger.net - Version 1.0.9688.0
Built: 10/18/2022 11:08:12 PM
VK3TCP logs generated @ 2022-11-04 05:14:45Z
Contest Name: OCEANIACW - 2022-10-08
`,
        adifVer: undefined,
        createdTimestamp: undefined,
        programid: undefined,
        programversion: undefined,
      },
      records: [
        {
          call: "VK2W",
          qsoDate: "20221008",
          timeOn: "083557",
          timeOff: "083557",
          band: "40m",
          stationCallsign: "VK3TCP",
          freq: new Decimal("7.01610"),
          contestId: "Oceania-DX-CW",
          freqRx: new Decimal("7.01610"),
          mode: "CW",
          rstSent: "599",
          rstRcvd: "599",
          txPwr: new Decimal(10),
          operator: "VK3TCP",
          srx: 41,
          cqz: 30,
          stx: 1,
          appN1MmPoints: "5",
          appN1MmRadioNr: "1",
          appN1MmContinent: "OC",
          appN1MmRun1Run2: "1",
          appN1MmRadiointerfaced: "1",
          appN1MmIsoriginal: "True",
          appN1MmNetbiosname: "ALANHARPERDC4A",
          appN1MmIsrunqso: "0",
          pfx: "VK2",
          appN1MmMult1: "1",
          appN1MmMult2: "0",
          appN1MmMult3: "0",
          appN1MmId: "095457c67f9d452eb24945bf46f863ba",
          appN1MmClaimedqso: "1",
        },
        {
          call: "VK3DPH/P",
          qsoDate: "20221008",
          timeOn: "101925",
          timeOff: "101925",
          band: "40m",
          stationCallsign: "VK3TCP",
          freq: new Decimal("7.028"),
          contestId: "Oceania-DX-CW",
          freqRx: new Decimal("7.028"),
          mode: "CW",
          rstSent: "599",
          rstRcvd: "599",
          txPwr: new Decimal(10),
          operator: "VK3TCP",
          srx: 1,
          cqz: 30,
          stx: 2,
          appN1MmPoints: "5",
          appN1MmRadioNr: "1",
          appN1MmContinent: "OC",
          appN1MmRun1Run2: "1",
          appN1MmRadiointerfaced: "1",
          appN1MmIsoriginal: "True",
          appN1MmNetbiosname: "ALANHARPERDC4A",
          appN1MmIsrunqso: "0",
          pfx: "VK3",
          appN1MmMult1: "1",
          appN1MmMult2: "0",
          appN1MmMult3: "0",
          appN1MmId: "35e4b29d66f04665a753f8c161d7ffbd",
          appN1MmClaimedqso: "1",
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
