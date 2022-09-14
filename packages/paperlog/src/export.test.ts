import * as fc from "fast-check";
import { exportLogs } from "./export";
import {
  callsignArb,
  parserContactArb,
  potaRefArb,
  sotaRefArb,
  wwffRefArb,
} from "./testArbitaries";

describe("export", () => {
  test("export all contacts", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc
            .tuple(
              parserContactArb(),
              fc.oneof(sotaRefArb(), fc.constant(undefined)),
              fc.oneof(sotaRefArb(), fc.constant(undefined))
            )
            .map(([contact, sotaRef, mySotaRef]) => {
              return { ...contact, sotaRef, mySotaRef };
            }),
          { minLength: 1 }
        ),
        (contacts) => {
          const results = exportLogs({ contacts, srcFileName: "contacts.txt" });

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
              parserContactArb(),
              fc.oneof(sotaRefArb(), fc.constant(undefined)),
              fc.oneof(sotaRefArb(), fc.constant(undefined))
            )
            .filter(
              ([_contact, sotaRef, mySotaRef]) =>
                typeof sotaRef == "string" || typeof mySotaRef == "string"
            )
            .map(([contact, sotaRef, mySotaRef]) => {
              return { ...contact, sotaRef, mySotaRef };
            }),
          { minLength: 1 }
        ),
        (contacts) => {
          const results = exportLogs({ contacts, srcFileName: "contacts.txt" });

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
            fc.array(parserContactArb(), { minLength: 1 }),
            wwffRefArb(),
            callsignArb()
          )
          .map(([contacts, myWwffRef, stationCallsign]) => {
            return {
              contacts: contacts.map((c) => {
                return { ...c, myWwffRef, stationCallsign };
              }),
              myWwffRef,
              stationCallsign,
            };
          }),
        ({ contacts, myWwffRef, stationCallsign }) => {
          const dates = [...new Set(contacts.map(({ qsoDate }) => qsoDate))];
          const results = exportLogs({ contacts, srcFileName: "contacts.txt" });

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
            fc.array(parserContactArb(), { minLength: 1 }),
            potaRefArb(),
            callsignArb()
          )
          .map(([contacts, myPotaRef, stationCallsign]) => {
            return {
              contacts: contacts.map((c) => {
                return { ...c, myPotaRef, stationCallsign };
              }),
              myPotaRef,
              stationCallsign,
            };
          }),
        ({ contacts, myPotaRef, stationCallsign }) => {
          const date = [
            ...new Set(contacts.map(({ qsoDate }) => qsoDate)),
          ].sort();
          const results = exportLogs({ contacts, srcFileName: "contacts.txt" });

          const filename = `${stationCallsign}@${myPotaRef}-${date[0]}.adi`;

          expect(new Set(Object.keys(results.files))).toStrictEqual(
            new Set(["contacts.txt.all.adi", filename])
          );
        }
      )
    );
  });
});
