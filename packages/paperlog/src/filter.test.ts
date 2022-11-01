import * as fc from "fast-check";
import { array, assert } from "superstruct";
import { AdifRecord } from "./adif/adifRecord";
import { filterPota, filterSota, filterWwff } from "./filter";
import {
  adifRecordArb,
  potaRefArb,
  sotaRefArb,
  wwffRefArb,
} from "./testArbitaries";

describe("filter", () => {
  describe("filter sota", () => {
    it("returns nothing if sota ref and my sota ref is blank", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(adifRecordArb(), fc.constantFrom(undefined, ""))
              .map(([c, sotaRef]) => {
                return { ...c, sotaRef };
              })
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterSota(contacts)).toEqual([]);
          }
        )
      );
    });
    it("returns contacts with my sota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(adifRecordArb(), sotaRefArb()).map(([c, mySotaRef]) => {
              return {
                ...c,
                mySotaRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterSota(contacts)).toEqual(contacts);
          }
        )
      );
    });

    it("returns contacts with sota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(adifRecordArb(), sotaRefArb()).map(([c, sotaRef]) => {
              return {
                ...c,
                sotaRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
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
              .tuple(adifRecordArb(), fc.constantFrom(undefined, ""))
              .map(([c, potaRef]) => {
                return { ...c, potaRef };
              })
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterPota(contacts)).toEqual([]);
          }
        )
      );
    });
    it("returns contacts with my pota ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(adifRecordArb(), potaRefArb()).map(([c, myPotaRef]) => {
              return {
                ...c,
                appPaperlogMyPotaRef: myPotaRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
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
              .tuple(adifRecordArb(), fc.constantFrom(undefined, ""))
              .map(([c, wwffRef]) => {
                return { ...c, wwffRef };
              })
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterWwff(contacts)).toEqual([]);
          }
        )
      );
    });
    it("returns contacts with my wwff ref set", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.tuple(adifRecordArb(), wwffRefArb()).map(([c, myWwffRef]) => {
              return {
                ...c,
                myWwffRef,
              };
            })
          ),
          (contacts) => {
            assert(contacts, array(AdifRecord));
            expect(filterWwff(contacts)).toEqual(contacts);
          }
        )
      );
    });
  });
});
