import { describe, expect } from "vitest";
import { test } from "@fast-check/vitest";
import * as fc from "fast-check";
import { array, assert } from "superstruct";
import { potaRefArb, sotaRefArb, wwffRefArb } from "./adif/adifFieldArbs";
import { AdifRecord } from "./adif/adifRecord";
import { filterPota, filterSota, filterWwff } from "./filter";
import { adifRecordValidatedArb } from "./testArbitaries";

describe("filter", () => {
  describe("filter sota", () => {
    test("returns nothing if sota ref and my sota ref is blank", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(adifRecordValidatedArb, fc.constantFrom(undefined, ""))
              .map(([c, sotaRef]) => {
                return { ...c, sotaRef, mySotaRef: sotaRef };
              }),
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterSota(contacts)).toEqual([]);
          },
        ),
      );
    });
    test("returns contacts with my sota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(adifRecordValidatedArb, sotaRefArb)
              .map(([c, mySotaRef]) => {
                return {
                  ...c,
                  mySotaRef,
                };
              }),
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterSota(contacts)).toEqual(contacts);
          },
        ),
      );
    });

    test("returns contacts with sota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(adifRecordValidatedArb, sotaRefArb).map(([c, sotaRef]) => {
              return {
                ...c,
                sotaRef,
              };
            }),
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterSota(contacts)).toEqual(contacts);
          },
        ),
      );
    });
  });

  describe("filter pota", () => {
    test("returns nothing if my pota ref is blank", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(adifRecordValidatedArb).map(([c]) => {
              return { ...c, appPaperlogMyPotaRef: undefined };
            }),
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterPota(contacts)).toEqual([]);
          },
        ),
      );
    });
    test("returns contacts with my pota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(adifRecordValidatedArb, potaRefArb)
              .map(([c, myPotaRef]) => {
                return {
                  ...c,
                  appPaperlogMyPotaRef: myPotaRef,
                };
              }),
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterPota(contacts)).toEqual(contacts);
          },
        ),
      );
    });
  });
  describe("filter wwff", () => {
    test("returns nothing if my wwff ref is blank", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(adifRecordValidatedArb, fc.constantFrom(undefined, ""))
              .map(([c, myWwffRef]) => {
                return { ...c, myWwffRef };
              }),
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterWwff(contacts)).toEqual([]);
          },
        ),
      );
    });
    test("returns contacts with my wwff ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(adifRecordValidatedArb, wwffRefArb)
              .map(([c, myWwffRef]) => {
                return {
                  ...c,
                  myWwffRef,
                };
              }),
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterWwff(contacts)).toEqual(contacts);
          },
        ),
      );
    });
  });
});
