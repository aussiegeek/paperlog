import {
  collectGlobalErrors,
  parse,
  validationMessagesForResult,
} from "./parse";
import fc from "fast-check";
import { logEntryLineArb, frequencyCommandArb } from "./testArbitaries";
import {
  callsignArb,
  dateArb,
  modeEnumArb,
  timeWithoutSeconds,
} from "./adif/adifFieldArbs";
import Decimal from "decimal.js";

describe("parse", () => {
  test("basic sota activation", () => {
    const input = `station vk3tcp date 20220317 mysota vk3/vc-014
    7.134 mode ssb call vk2met 2300 s55 r57 sota vk1/ac-040
    7.126 call vk3pf 2323
    7.032 mode cw
    2334 call vk3pf s559 r579
    2347 call VK1AD/P SOTA VK1/AC-040
    date 20220318 0005 mode ssb 7.112 call vk1vic r51 sota vk1/ac-023`;

    const output = [
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK2MET",
          rstRcvd: "57",
          rstSent: "55",
          qsoDate: "20220317",
          timeOn: "2300",
          freq: new Decimal(7.134),
          mode: "SSB",
          mySotaRef: "VK3/VC-014",
          sotaRef: "VK1/AC-040",
        },
      },
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK3PF",
          rstRcvd: "59",
          rstSent: "59",
          qsoDate: "20220317",
          timeOn: "2323",
          freq: new Decimal(7.126),
          mode: "SSB",
          mySotaRef: "VK3/VC-014",
        },
      },
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK3PF",
          rstRcvd: "579",
          rstSent: "559",
          qsoDate: "20220317",
          timeOn: "2334",
          freq: new Decimal(7.032),
          mode: "CW",
          mySotaRef: "VK3/VC-014",
        },
      },
      {
        contact: {
          stationCallsign: "VK3TCP",
          qsoDate: "20220317",
          timeOn: "2347",
          call: "VK1AD/P",
          sotaRef: "VK1/AC-040",
          rstSent: "599",
          rstRcvd: "599",
          freq: new Decimal(7.032),
          mode: "CW",
          mySotaRef: "VK3/VC-014",
        },
      },
      {
        contact: {
          call: "VK1VIC",
          freq: new Decimal(7.112),
          mode: "SSB",
          mySotaRef: "VK3/VC-014",
          qsoDate: "20220318",
          rstRcvd: "51",
          rstSent: "59",
          sotaRef: "VK1/AC-023",
          stationCallsign: "VK3TCP",
          timeOn: "0005",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("multiple calls in same minute", () => {
    const input = `station vk3tcp date 20220317 7.134 mode ssb
    2301 call vk2met
    call vk3pf`;

    const output = [
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK2MET",
          rstRcvd: "59",
          rstSent: "59",
          qsoDate: "20220317",
          timeOn: "2301",
          freq: new Decimal(7.134),
          mode: "SSB",
        },
      },
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK3PF",
          rstRcvd: "59",
          rstSent: "59",
          qsoDate: "20220317",
          timeOn: "2301",
          freq: new Decimal(7.134),
          mode: "SSB",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("wwff only activation", () => {
    const input = `station vk3tcp date 20211229 mode ssb mywwff vkff-0763
0255 call zl1tm 28.480 s53 r44
0311 call vk3pf/p 7.150 wwff vkff-0339 sota vk3/ve-019
    `;

    const output = [
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "ZL1TM",
          rstRcvd: "44",
          rstSent: "53",
          qsoDate: "20211229",
          timeOn: "0255",
          freq: new Decimal(28.48),
          mode: "SSB",
          myWwffRef: "VKFF-0763",
        },
      },
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK3PF/P",
          rstRcvd: "59",
          rstSent: "59",
          qsoDate: "20211229",
          timeOn: "0311",
          freq: new Decimal(7.15),
          mode: "SSB",
          sotaRef: "VK3/VE-019",
          wwffRef: "VKFF-0339",
          myWwffRef: "VKFF-0763",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("pota activation", () => {
    const input = `station vk3tcp date 20211219 mode ssb mypota vk-0485
0009 call vk4fbjl 21.144 s55 r41 pota vk-1366
0015 call vk2hbg 7.125 s55 r41`;

    const output = [
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK4FBJL",
          freq: new Decimal(21.144),
          mode: "SSB",
          appPaperlogMyPotaRef: "VK-0485",
          qsoDate: "20211219",
          rstRcvd: "41",
          rstSent: "55",
          appPaperlogPotaRef: "VK-1366",
          timeOn: "0009",
        },
      },
      {
        contact: {
          stationCallsign: "VK3TCP",
          call: "VK2HBG",
          freq: new Decimal(7.125),
          mode: "SSB",
          appPaperlogMyPotaRef: "VK-0485",
          qsoDate: "20211219",
          rstRcvd: "41",
          rstSent: "55",
          timeOn: "0015",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("station,operator callsigns", () => {
    const input = `station vk3prg operator vk3tcp date 20211219 mode ssb
    0009 call vk4fbjl 21.144 s55 r41
    0015 call vk2hbg 7.125 s55 r41`;

    const output = [
      {
        contact: {
          stationCallsign: "VK3PRG",
          operator: "VK3TCP",
          call: "VK4FBJL",
          freq: new Decimal(21.144),
          mode: "SSB",
          qsoDate: "20211219",
          rstRcvd: "41",
          rstSent: "55",
          timeOn: "0009",
        },
      },
      {
        contact: {
          stationCallsign: "VK3PRG",
          operator: "VK3TCP",
          call: "VK2HBG",
          freq: new Decimal(7.125),
          mode: "SSB",
          qsoDate: "20211219",
          rstRcvd: "41",
          rstSent: "55",
          timeOn: "0015",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("ft8 contact", () => {
    const input = `station vk3prg operator vk3tcp date 20220805 mode ssb mywwff vkff-2452 mypota vk-2796
    18.102 call k7oeg 20220805 mode ft8 s-10 r-13 timeOn 033745`;
    const output = [
      {
        contact: {
          call: "K7OEG",
          freq: new Decimal(18.102),
          mode: "FT8",
          appPaperlogMyPotaRef: "VK-2796",
          myWwffRef: "VKFF-2452",
          operator: "VK3TCP",
          stationCallsign: "VK3PRG",
          qsoDate: "20220805",
          timeOn: "033745",
          rstRcvd: "-13",
          rstSent: "-10",
        },
      },
    ];
    expect(parse(input)).toEqual(output);
  });

  test("clearing mysota reference", () => {
    const input = `station vk3tcp date 20220805 mode cw mysota vk3/vc-001 7.032
    call vk3pf 0032
    mysota reset
    call vk2io 0143`;

    const output = [
      {
        contact: {
          call: "VK3PF",
          freq: new Decimal(7.032),
          mode: "CW",
          qsoDate: "20220805",
          rstRcvd: "599",
          rstSent: "599",
          stationCallsign: "VK3TCP",
          timeOn: "0032",
          mySotaRef: "VK3/VC-001",
        },
      },
      {
        contact: {
          call: "VK2IO",
          freq: new Decimal(7.032),
          mode: "CW",
          qsoDate: "20220805",
          rstRcvd: "599",
          rstSent: "599",
          stationCallsign: "VK3TCP",
          timeOn: "0143",
        },
      },
    ];
    expect(parse(input)).toEqual(output);
  });

  test("clearing mypota reference", () => {
    const input = `station vk3tcp date 20220805 mode cw mypota VK-0334 7.032
    call vk3pf 0032
    mypota reset
    call vk2io 0143`;

    const output = [
      {
        contact: {
          call: "VK3PF",
          freq: new Decimal(7.032),
          mode: "CW",
          qsoDate: "20220805",
          rstRcvd: "599",
          rstSent: "599",
          stationCallsign: "VK3TCP",
          timeOn: "0032",
          appPaperlogMyPotaRef: "VK-0334",
        },
      },
      {
        contact: {
          call: "VK2IO",
          freq: new Decimal(7.032),
          mode: "CW",
          qsoDate: "20220805",
          rstRcvd: "599",
          rstSent: "599",
          stationCallsign: "VK3TCP",
          timeOn: "0143",
        },
      },
    ];
    expect(parse(input)).toEqual(output);
  });

  test("clearing mywwff reference", () => {
    const input = `station vk3tcp date 20220805 mode cw mywwff VKFF-0565 7.032
    call vk3pf 0032
    mywwff reset
    call vk2io 0143`;

    const output = [
      {
        contact: {
          call: "VK3PF",
          freq: new Decimal(7.032),
          mode: "CW",
          qsoDate: "20220805",
          rstRcvd: "599",
          rstSent: "599",
          stationCallsign: "VK3TCP",
          timeOn: "0032",
          myWwffRef: "VKFF-0565",
        },
      },
      {
        contact: {
          call: "VK2IO",
          freq: new Decimal(7.032),
          mode: "CW",
          qsoDate: "20220805",
          rstRcvd: "599",
          rstSent: "599",
          stationCallsign: "VK3TCP",
          timeOn: "0143",
        },
      },
    ];
    expect(parse(input)).toEqual(output);
  });

  test("gridsquare", () => {
    const input = `station vk3tcp date 20210831 mode ft8 mygridsquare qf22id 7.074
    call 3D2TS timeon 120715 7.0747 gridsquare RH91 r-06 s-13
    call vk2io 0143 gridsquare qf56lg`;

    const output = [
      {
        contact: {
          call: "3D2TS",
          freq: new Decimal(7.0747),
          mode: "FT8",
          qsoDate: "20210831",
          rstRcvd: "-06",
          rstSent: "-13",
          stationCallsign: "VK3TCP",
          timeOn: "120715",
          gridsquare: "RH91",
          myGridsquare: "QF22ID",
        },
      },
      {
        contact: {
          call: "VK2IO",
          freq: new Decimal(7.0747),
          mode: "FT8",
          qsoDate: "20210831",
          rstRcvd: "59",
          rstSent: "59",
          stationCallsign: "VK3TCP",
          timeOn: "0143",
          gridsquare: "QF56LG",
          myGridsquare: "QF22ID",
        },
      },
    ];
    expect(parse(input)).toEqual(output);
  });

  test("txpwr", () => {
    const input = `station vk3tcp date 20220201 mode ssb 0301 7.130 txpwr 5 call n3tj`;

    const output = [
      {
        contact: {
          txPwr: new Decimal(5),
          call: "N3TJ",
          freq: new Decimal(7.13),
          mode: "SSB",
          qsoDate: "20220201",
          rstRcvd: "59",
          rstSent: "59",
          stationCallsign: "VK3TCP",
          timeOn: "0301",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("owner", () => {
    const input = `station vk3tcp date 20220201 mode ssb 0301 7.130 txpwr 5 call n3tj`;

    const output = [
      {
        contact: {
          txPwr: new Decimal(5),
          call: "N3TJ",
          freq: new Decimal(7.13),
          mode: "SSB",
          qsoDate: "20220201",
          rstRcvd: "59",
          rstSent: "59",
          stationCallsign: "VK3TCP",
          timeOn: "0301",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("parse arbitary adif field", () => {
    const input = `station vk3tcp date 20220201 mode ssb 0301 7.130 txpwr 5 call n3tj [rig] K2`;

    const output = [
      {
        contact: {
          txPwr: new Decimal(5),
          call: "N3TJ",
          freq: new Decimal(7.13),
          mode: "SSB",
          qsoDate: "20220201",
          rstRcvd: "59",
          rstSent: "59",
          stationCallsign: "VK3TCP",
          timeOn: "0301",
          rig: "K2",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("parse two adif fields", () => {
    const input = `station vk3tcp date 20220201 mode ssb 0301 7.130 txpwr 5 call n3tj [rig] K2 [name] Alan`;

    const output = [
      {
        contact: {
          txPwr: new Decimal(5),
          call: "N3TJ",
          freq: new Decimal(7.13),
          mode: "SSB",
          qsoDate: "20220201",
          rstRcvd: "59",
          rstSent: "59",
          stationCallsign: "VK3TCP",
          timeOn: "0301",
          rig: "K2",
          name: "Alan",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("parse two adif fields with qoutes", () => {
    const input = `station vk3tcp date 20220201 mode ssb 0301 7.130 txpwr 5 call n3tj [rig] "K2" [name] 3 [my_dxcc] "2"`;

    const output = [
      {
        contact: {
          txPwr: new Decimal(5),
          call: "N3TJ",
          freq: new Decimal(7.13),
          mode: "SSB",
          qsoDate: "20220201",
          rstRcvd: "59",
          rstSent: "59",
          stationCallsign: "VK3TCP",
          timeOn: "0301",
          rig: "K2",
          name: "3",
          myDxcc: "2",
        },
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("simple qsos", () => {
    fc.assert(
      fc.property(
        callsignArb,
        dateArb,
        frequencyCommandArb,
        modeEnumArb,
        fc.array(fc.tuple(callsignArb, timeWithoutSeconds)),
        fc.context(),
        (station, date, freq, mode, callsigns, ctx) => {
          let input = `station ${station} date ${date} ${freq} mode ${mode}\n`;
          callsigns.forEach(([callsign, timeon]) => {
            input += `call ${callsign} ${timeon}\n`;
          });

          ctx.log("Input " + input);

          const result = parse(input);

          const parseFailed = result.filter((c) => {
            if ("error" in c) {
              console.warn(c.error.toString());
              return true;
            }
            return false;
          });

          const validContacts = result.filter((c) => {
            return "contact" in c;
          });
          expect(parseFailed).toHaveLength(0);
          expect(validContacts).toHaveLength(callsigns.length);
        }
      )
    );
  });

  test("generate qsos with all fields", () => {
    fc.assert(
      fc.property(
        callsignArb,
        dateArb,
        frequencyCommandArb,
        modeEnumArb,
        fc.array(logEntryLineArb()),
        fc.context(),
        (station, date, freq, mode, loglines, ctx) => {
          let input = `station ${station} date ${date} ${freq} mode ${mode}\n`;
          input = input + loglines.join("\n");

          ctx.log("Input " + input);

          const result = parse(input);

          const parseFailed = result.filter((c) => {
            if ("error" in c) {
              console.warn(c.error.toString());
              return true;
            }
            return false;
          });

          const validContacts = result.filter((c) => {
            return "contact" in c;
          });
          expect(parseFailed).toHaveLength(0);
          expect(validContacts).toHaveLength(loglines.length);
        }
      )
    );
  });
});

describe("collect global errors", () => {
  test("all errors returned for a blank file", () => {
    const result = collectGlobalErrors(parse("call vk3tcp 0123"));

    expect(result).toStrictEqual([
      "Frequency not set, for 7.032MHz add `7.032`",
      "Mode not set, try `mode cw` or `mode ssb`",
      "No date command found. Try adding `date 20221114`",
      "Station (your callsign) not set, add `station VK1ABC`",
    ]);
  });
});

describe("individual parsing errors", () => {
  test("lexer failure", () => {
    const result = parse("0123 cal");
    const messages = validationMessagesForResult(result[0]!);
    expect(messages).toStrictEqual(["Unrecognised token starting at `cal`"]);
  });
  test("missing time", () => {
    const result = parse(
      "station vk1abc date 20220101 mode cw 7.032 call vk1abc"
    );
    const messages = validationMessagesForResult(result[0]!);
    expect(messages).toStrictEqual([
      "Time on can't be blank use `0123` for 0123UTC",
    ]);
  });
});
