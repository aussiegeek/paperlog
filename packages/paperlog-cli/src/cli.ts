#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  serialize,
  parse,
  AdifRecord,
  exportAdif,
  collectGlobalErrors,
  validationMessagesForResult,
  AdifFile,
  importAdif,
  exportPaperlog,
} from "paperlog";
import { is } from "superstruct";

export function logWriterForPath(destLogPath: string) {
  fs.mkdirSync(destLogPath, { recursive: true });
  return ([filename, adifFile]: [string, AdifFile]) => {
    fs.writeFileSync(path.join(destLogPath, filename), serialize(adifFile));
  };
}

function exportCommand(logPath: string) {
  const contacts = parse(fs.readFileSync(logPath, "utf8"));

  const globalMessages = collectGlobalErrors(contacts);
  if (globalMessages.length > 0) {
    console.log(globalMessages.join("\n"));
    console.log("\nFix these errors before continuing");
    process.exit(1);
  }

  const validContacts: AdifRecord[] = contacts
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

  if (validContacts.length != contacts.length) {
    console.error("Attempting to export with parser failure");
    process.exit(1);
  }

  const logWriter = logWriterForPath(
    path.join(path.dirname(logPath), "export")
  );

  Object.entries(
    exportAdif({ contacts: validContacts, srcFileName: path.basename(logPath) })
      .files
  ).forEach(logWriter);
}

function importAdifCommand(inputFilePath: string) {
  const adifFile = importAdif(fs.readFileSync(inputFilePath, "utf-8"));
  const dir = path.dirname(inputFilePath);
  const basename = path.basename(inputFilePath, ".adi");
  const outputPath = path.join(dir, basename + ".txt");

  console.log("Exporting to", outputPath);
  fs.writeFileSync(outputPath, exportPaperlog(adifFile));
}

yargs(hideBin(process.argv))
  .command<{ logs: string }>(
    "export [logs]",
    "Parse the contacts from path.txt and export ADIF files to same directory",
    (yargs) => {
      return yargs.positional("logs", {
        describe: "Path to contact logs",
        demandOption: true,
      });
    },
    (argv) => {
      exportCommand(argv.logs);
    }
  )
  .command<{ adifFile: string }>(
    "import <adifFile>",
    "Parse adif file log into paperlog format",
    (yargs) => {
      return yargs.positional("import", {
        describe: "Path to adif file to import",
        demandOption: true,
      });
    },
    (argv) => importAdifCommand(argv["adifFile"])
  )

  .strictCommands()
  .demandCommand(1)
  .help()
  .parse();
