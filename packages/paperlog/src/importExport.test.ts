import fc from "fast-check";
import { serialize } from "./adif";
import { importAdif } from "./importAdif";
import { adifFileValidatedArb, adifRecordValidatedArb } from "./testArbitaries";
import { exportPaperlog } from "./exportPaperlog";
import { parse, validationMessagesForResult } from "./parse";
import { AdifRecord } from "./adif/adifRecord";
import { exportAdif } from "./exportAdif";
import { is } from "superstruct";

describe("import/export", () => {
  test("serialize/deserialize adif file", () => {
    fc.assert(
      fc.property(adifFileValidatedArb, fc.context(), (adifFile, ctx) => {
        const serialized = serialize(adifFile);

        ctx.log(`Serialzed \`${serialized}\``);
        const parsed = importAdif(serialized);

        expect(parsed).toStrictEqual(adifFile);
      })
    );
  });

  test("serialize/deserialize paperlog file", () => {
    fc.assert(
      fc.property(
        fc.array(adifRecordValidatedArb).map((records) => {
          return { records };
        }),
        fc.context(),
        (adifFile, ctx) => {
          const serialized = exportPaperlog(adifFile);
          ctx.log(`Serialized \`${serialized}\``);
          const parsed = parse(serialized);
          ctx.log(`parsed \`${JSON.stringify(parsed)}\``);

          const parseFailed = parsed.filter((c) => {
            if ("error" in c) {
              console.warn(c.error.toString());
              return true;
            }
            return false;
          });

          const validContacts: AdifRecord[] = parsed
            .map((result) => {
              if ("contact" in result) {
                return result.contact;
              }
              console.warn("Error on line:\n" + result.line + "\n");
              const messages = validationMessagesForResult(result);
              console.warn(messages.join("\n") + "\n");
              return;
            })
            .filter((c): c is AdifRecord => is(c, AdifRecord));

          const parsedAdifFile = exportAdif({
            contacts: validContacts,
            srcFileName: "contacts.txt",
          }).files["contacts.txt.all.adi"];

          expect(parseFailed).toHaveLength(0);

          expect(parsedAdifFile!.records).toStrictEqual(adifFile.records);
        }
      )
    );
  });
});
