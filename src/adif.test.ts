import { AdifFile, serialize } from "./adif";

describe("adif", () => {
  describe("manual serialization", () => {
    test("it serialzies a sample file with no header correctly", () => {
      const file: AdifFile = {
        records: [
          {
            stationCallsign: "VK3TCP",
            qsoDate: "19900620",
            timeOn: "1523",
            call: "VK9NS",
            band: "20m",
            freq: 14,
            mode: "RTTY",
            rstSent: "59",
            rstRcvd: "59",
          },
          {
            stationCallsign: "VK3TCP",
            qsoDate: "20101022",
            timeOn: "0111",
            call: "ON4UN",
            band: "40m",
            freq: 7,
            mode: "PSK",
            submode: "PSK63",
            rstSent: "59",
            rstRcvd: "59",
          },
        ],
      };
      const sample = `<band:3>20m
<call:5>VK9NS
<freq:2>14
<mode:4>RTTY
<qso_date:8>19900620
<rst_rcvd:2>59
<rst_sent:2>59
<station_callsign:6>VK3TCP
<time_on:4>1523
<eor>

<band:3>40m
<call:5>ON4UN
<freq:1>7
<mode:3>PSK
<qso_date:8>20101022
<rst_rcvd:2>59
<rst_sent:2>59
<station_callsign:6>VK3TCP
<submode:5>PSK63
<time_on:4>0111
<eor>
`;

      expect(serialize(file)).toBe(sample);
    });

    test("serializes a sota activation", () => {
      const file: AdifFile = {
        records: [
          {
            stationCallsign: "VK3TCP",
            qsoDate: "20220312",
            timeOn: "2300",
            call: "VK2MET",
            band: "40m",
            mode: "SSB",
            freq: 7.134,
            rstSent: "55",
            rstRcvd: "57",
            sotaRef: "VK1/AC-040",
            mySotaRef: "VK3/VC-014",
          },
          {
            stationCallsign: "VK3TCP",
            qsoDate: "20220312",
            timeOn: "2343",
            call: "VK3BYD",
            band: "40m",
            mode: "CW",
            freq: 7.032,
            rstSent: "599",
            rstRcvd: "599",
            mySotaRef: "VK3/VC-014",
          },
        ],
      };
      const sample = `<band:3>40m
<call:6>VK2MET
<freq:5>7.134
<mode:3>SSB
<my_sota_ref:10>VK3/VC-014
<qso_date:8>20220312
<rst_rcvd:2>57
<rst_sent:2>55
<sota_ref:10>VK1/AC-040
<station_callsign:6>VK3TCP
<time_on:4>2300
<eor>

<band:3>40m
<call:6>VK3BYD
<freq:5>7.032
<mode:2>CW
<my_sota_ref:10>VK3/VC-014
<qso_date:8>20220312
<rst_rcvd:3>599
<rst_sent:3>599
<station_callsign:6>VK3TCP
<time_on:4>2343
<eor>
`;
      expect(serialize(file)).toBe(sample);
    });

    test("serializes a wwff activation", () => {
      const file: AdifFile = {
        records: [
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
            mySig: "WWFF",
            mySigInfo: "VKFF-0763",
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
            sig: "WWFF",
            sigInfo: "VKFF-0339",
            mySig: "WWFF",
            mySigInfo: "VKFF-0763",
          },
        ],
      };
      const sample = `<band:3>10m
<call:5>ZL1TM
<freq:5>28.48
<mode:3>SSB
<my_sig:4>WWFF
<my_sig_info:9>VKFF-0763
<qso_date:8>20211229
<rst_rcvd:2>44
<rst_sent:2>53
<station_callsign:6>VK3TCP
<time_on:4>0255
<eor>

<band:3>40m
<call:7>VK3PF/P
<freq:4>7.15
<mode:3>SSB
<my_sig:4>WWFF
<my_sig_info:9>VKFF-0763
<qso_date:8>20211229
<rst_rcvd:2>59
<rst_sent:2>59
<sig:4>WWFF
<sig_info:9>VKFF-0339
<station_callsign:6>VK3TCP
<time_on:4>0311
<eor>
`;
      expect(serialize(file)).toBe(sample);
    });
  });
});
