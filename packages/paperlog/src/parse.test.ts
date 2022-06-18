import { parse } from "./parse";

describe("parse", () => {
  test("basic sota activation", () => {
    const input = `mycall vk3tcp date 20220317 mysota vk3/vc-014
    7.134 mode ssb call vk2met 2300 s55 r57 sota vk1/ac-040
    7.126 call vk3pf 2323
    7.032 cw
    2334 call vk3pf s559 r579
    2347 call VK1AD/P SOTA VK1/AC-040
    date 20220318 0005 mode ssb 7.112 call vk1vic r51 sota vk1/ac-023`;

    const output = [
      {
        stationCallsign: "VK3TCP",
        call: "VK2MET",
        rstRcvd: "57",
        rstSent: "55",
        qsoDate: "20220317",
        timeOn: "2300",
        band: "40m",
        freq: 7.134,
        mode: "SSB",
        mySotaRef: "VK3/VC-014",
        sotaRef: "VK1/AC-040",
      },
      {
        stationCallsign: "VK3TCP",
        call: "VK3PF",
        rstRcvd: "59",
        rstSent: "59",
        qsoDate: "20220317",
        timeOn: "2323",
        band: "40m",
        freq: 7.126,
        mode: "SSB",
        mySotaRef: "VK3/VC-014",
      },
      {
        stationCallsign: "VK3TCP",
        call: "VK3PF",
        rstRcvd: "579",
        rstSent: "559",
        qsoDate: "20220317",
        timeOn: "2334",
        band: "40m",
        freq: 7.032,
        mode: "CW",
        mySotaRef: "VK3/VC-014",
      },
      {
        stationCallsign: "VK3TCP",
        qsoDate: "20220317",
        timeOn: "2347",
        call: "VK1AD/P",
        sotaRef: "VK1/AC-040",
        rstSent: "599",
        rstRcvd: "599",
        band: "40m",
        freq: 7.032,
        mode: "CW",
        mySotaRef: "VK3/VC-014",
      },
      {
        band: "40m",
        call: "VK1VIC",
        freq: 7.112,
        mode: "SSB",
        mySotaRef: "VK3/VC-014",
        qsoDate: "20220318",
        rstRcvd: "51",
        rstSent: "59",
        sotaRef: "VK1/AC-023",
        stationCallsign: "VK3TCP",
        timeOn: "0005",
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("multiple calls in same minute", () => {
    const input = `mycall vk3tcp date 20220317 7.134 mode ssb
    2301 call vk2met
    call vk3pf`;

    const output = [
      {
        stationCallsign: "VK3TCP",
        call: "VK2MET",
        rstRcvd: "59",
        rstSent: "59",
        qsoDate: "20220317",
        timeOn: "2301",
        band: "40m",
        freq: 7.134,
        mode: "SSB",
      },
      {
        stationCallsign: "VK3TCP",
        call: "VK3PF",
        rstRcvd: "59",
        rstSent: "59",
        qsoDate: "20220317",
        timeOn: "2301",
        band: "40m",
        freq: 7.134,
        mode: "SSB",
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("wwff only activation", () => {
    const input = `mycall vk3tcp date 20211229 mode ssb mywwff vkff-0763
0255 call zl1tm 28.480 s53 r44
0311 call vk3pf/p 7.150 wwff vkff-0339 sota vk3/ve-019
    `;

    const output = [
      {
        stationCallsign: "VK3TCP",
        call: "ZL1TM",
        rstRcvd: "44",
        rstSent: "53",
        qsoDate: "20211229",
        timeOn: "0255",
        band: "10m",
        freq: 28.48,
        mode: "SSB",
        myWwffRef: "VKFF-0763",
      },
      {
        stationCallsign: "VK3TCP",
        call: "VK3PF/P",
        rstRcvd: "59",
        rstSent: "59",
        qsoDate: "20211229",
        timeOn: "0311",
        band: "40m",
        freq: 7.15,
        mode: "SSB",
        sotaRef: "VK3/VE-019",
        wwffRef: "VKFF-0339",
        myWwffRef: "VKFF-0763",
      },
    ];

    expect(parse(input)).toEqual(output);
  });

  test("pota activation", () => {
    const input = `mycall vk3tcp date 20211219 mode ssb mypota vk-0485
0009 call vk4fbjl 21.144 s55 r41 pota vk-1366
0015 call vk2hbg 7.125 s55 r41`;

    const output = [
      {
        stationCallsign: "VK3TCP",
        band: "15m",
        call: "VK4FBJL",
        freq: 21.144,
        mode: "SSB",
        myPotaRef: "VK-0485",
        qsoDate: "20211219",
        rstRcvd: "41",
        rstSent: "55",
        potaRef: "VK-1366",
        timeOn: "0009",
      },
      {
        stationCallsign: "VK3TCP",
        band: "40m",
        call: "VK2HBG",
        freq: 7.125,
        mode: "SSB",
        myPotaRef: "VK-0485",
        qsoDate: "20211219",
        rstRcvd: "41",
        rstSent: "55",
        timeOn: "0015",
      },
    ];

    expect(parse(input)).toEqual(output);
  });
});
