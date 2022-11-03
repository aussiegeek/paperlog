import * as fc from "fast-check";
import {
  callsignArb,
  sotaRefArb,
  wwffRefArb,
  potaRefArb,
} from "./adif/adifFieldArbs";
import { exportAdif } from "./exportAdif";
import { isPresent } from "./isPresent";
import { adifRecordValidatedArb } from "./testArbitaries";

describe("export", () => {
  test("export all contacts", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc
            .tuple(
              adifRecordValidatedArb,
              fc.oneof(sotaRefArb, fc.constant(undefined)),
              fc.oneof(sotaRefArb, fc.constant(undefined))
            )
            .map(([contact, sotaRef, mySotaRef]) => {
              return { ...contact, sotaRef, mySotaRef };
            }),
          { minLength: 1 }
        ),
        (contacts) => {
          const results = exportAdif({ contacts, srcFileName: "contacts.txt" });

          expect(results.files["contacts.txt.all.adi"]?.records).toHaveLength(
            contacts.length
          );
        }
      )
    );
  });

  test("export sota contacts only", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc
            .tuple(
              adifRecordValidatedArb,
              fc.oneof(sotaRefArb, fc.constant(undefined)),
              fc.oneof(sotaRefArb, fc.constant(undefined))
            )
            .filter(
              ([_contact, sotaRef, mySotaRef]) =>
                isPresent(sotaRef) || isPresent(mySotaRef)
            )
            .map(([contact, sotaRef, mySotaRef]) => {
              return {
                ...contact,
                sotaRef,
                mySotaRef,
                appMyPotaRef: undefined,
                myWwffRef: undefined,
              };
            }),
          { minLength: 1 }
        ),
        (contacts) => {
          const results = exportAdif({ contacts, srcFileName: "contacts.txt" });

          expect(Object.keys(results.files)).toStrictEqual([
            "contacts.txt.all.adi",
            "contacts.txt.sota.adi",
          ]);

          expect(results.files["contacts.txt.sota.adi"]?.records).toHaveLength(
            contacts.length
          );
        }
      )
    );
  });

  test("export wwff contacts only", () => {
    fc.assert(
      fc.property(
        fc
          .tuple(
            fc.array(adifRecordValidatedArb, { minLength: 1 }),
            wwffRefArb,
            callsignArb
          )
          .map(([contacts, myWwffRef, stationCallsign]) => {
            return {
              contacts: contacts.map((c) => {
                return {
                  ...c,
                  myWwffRef,
                  stationCallsign,
                  mySotaRef: undefined,
                  sotaRef: undefined,
                };
              }),
              myWwffRef,
              stationCallsign,
            };
          }),
        ({ contacts, myWwffRef, stationCallsign }) => {
          const dates = [...new Set(contacts.map(({ qsoDate }) => qsoDate))];
          const results = exportAdif({ contacts, srcFileName: "contacts.txt" });

          const filenames = dates.map(
            (d) => `${stationCallsign} @ ${myWwffRef} ${d}.adi`
          );

          expect(new Set(Object.keys(results.files))).toStrictEqual(
            new Set(["contacts.txt.all.adi", ...filenames])
          );
        }
      )
    );
  });

  test("export pota contacts only", () => {
    fc.assert(
      fc.property(
        fc
          .tuple(
            fc.array(adifRecordValidatedArb, { minLength: 1 }),
            potaRefArb,
            callsignArb
          )
          .map(([contacts, myPotaRef, stationCallsign]) => {
            return {
              contacts: contacts.map((c) => {
                return {
                  ...c,
                  appPaperlogMyPotaRef: myPotaRef,
                  stationCallsign,
                  myWwffRef: undefined,
                  mySotaRef: undefined,
                  sotaRef: undefined,
                };
              }),
              myPotaRef,
              stationCallsign,
            };
          }),
        ({ contacts, myPotaRef, stationCallsign }) => {
          const date = [
            ...new Set(contacts.map(({ qsoDate }) => qsoDate)),
          ].sort();
          const results = exportAdif({
            contacts,
            srcFileName: "contacts.txt",
          });

          const filename = `${stationCallsign}@${myPotaRef}-${date[0]}.adi`;

          expect(new Set(Object.keys(results.files))).toStrictEqual(
            new Set(["contacts.txt.all.adi", filename])
          );
        }
      )
    );
  });
});
