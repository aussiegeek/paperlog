import * as fc from "fast-check";
import { ParserContact } from "./parse";
import { array, assert } from "superstruct";
import { filterPota, filterSota, filterWwff } from "./filter";

const callsign = fc
  .tuple(fc.constant("VK"), fc.integer({ min: 0, max: 9 }))
  .map(([prefix]) => [prefix].join(""));

const parserContact = fc.record<ParserContact>({
  call: callsign,
  stationCallsign: fc.constant("zxcv1234"),
  qsoDate: fc.constant("20220101"),
  timeOn: fc.constant("1234"),
  band: fc.constant("20m"),
  mode: fc.constant("CW"),
  freq: fc.constant(7),
  rstSent: fc.constant("59"),
  rstRcvd: fc.constant("59"),
});

const upperAlpha = fc.constantFrom(
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
);

const sotaAssocArb = fc
  .tuple(fc.constantFrom("VK", "ZL"), fc.integer({ min: 0, max: 9 }))
  .map(([prefix, number]) => [prefix, number].join(""));
const sotaRefArb = fc
  .tuple(
    sotaAssocArb,
    fc.stringOf(upperAlpha, { minLength: 1, maxLength: 3 }),
    fc.stringOf(
      fc.constantFrom("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"),
      { minLength: 3, maxLength: 3 }
    )
  )
  .map(([assoc, region, summit]) => `${assoc}/${region}-${summit}`);

const potaRefArb = fc
  .tuple(
    fc.constantFrom("VK", "ZL"),
    fc.stringOf(
      fc.constantFrom("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"),
      { minLength: 4, maxLength: 4 }
    )
  )
  .map(([prefix, code]) => `${prefix}-${code}`);

const wwffRefArb = fc
  .tuple(
    fc.constantFrom("VK", "ZL"),
    fc.stringOf(
      fc.constantFrom("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"),
      { minLength: 4, maxLength: 4 }
    )
  )
  .map(([prefix, code]) => `${prefix}FF-${code}`);

describe("filter", () => {
  describe("filter sota", () => {
    it("returns nothing if sota ref and my sota ref is blank", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(parserContact, fc.constantFrom(undefined, ""))
              .map(([c, sotaRef]) => {
                return { ...c, sotaRef };
              })
          ),
          (contacts) => {
            assert(contacts, array(ParserContact));
            expect(filterSota(contacts)).toEqual([]);
          }
        )
      );
    });
    it("returns contacts with my sota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(parserContact, sotaRefArb).map(([c, mySotaRef]) => {
              return {
                ...c,
                mySotaRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(ParserContact));
            expect(filterSota(contacts)).toEqual(contacts);
          }
        )
      );
    });

    it("returns contacts with sota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(parserContact, sotaRefArb).map(([c, sotaRef]) => {
              return {
                ...c,
                sotaRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(ParserContact));
            expect(filterSota(contacts)).toEqual(contacts);
          }
        )
      );
    });
  });

  describe("filter pota", () => {
    it("returns nothing if my pota ref is blank", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(parserContact, fc.constantFrom(undefined, ""))
              .map(([c, potaRef]) => {
                return { ...c, potaRef };
              })
          ),
          (contacts) => {
            assert(contacts, array(ParserContact));
            expect(filterPota(contacts)).toEqual([]);
          }
        )
      );
    });
    it("returns contacts with my pota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(parserContact, potaRefArb).map(([c, myPotaRef]) => {
              return {
                ...c,
                myPotaRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(ParserContact));
            expect(filterPota(contacts)).toEqual(contacts);
          }
        )
      );
    });
  });
  describe("filter wwff", () => {
    it("returns nothing if my wwff ref is blank", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(parserContact, fc.constantFrom(undefined, ""))
              .map(([c, wwffRef]) => {
                return { ...c, wwffRef };
              })
          ),
          (contacts) => {
            assert(contacts, array(ParserContact));
            expect(filterWwff(contacts)).toEqual([]);
          }
        )
      );
    });
    it("returns contacts with my wwff ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(parserContact, wwffRefArb).map(([c, myWwffRef]) => {
              return {
                ...c,
                myWwffRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(ParserContact));
            expect(filterWwff(contacts)).toEqual(contacts);
          }
        )
      );
    });
  });
});
