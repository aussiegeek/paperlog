#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { AdifRecord, serialize } from "./adif";
import { parse, ParserContact } from "./parse";
import { filterSota } from "./filter";

function writeContactsToFile(records: AdifRecord[], dest: string) {
  const adifFile = { records: records };
  fs.writeFileSync(dest, serialize(adifFile));
}

function baseContactToRecord(contact: ParserContact): AdifRecord {
  const {
    band,
    qsoDate,
    timeOn,
    stationCallsign,
    call,
    mode,
    freq,
    rstSent,
    rstRcvd,
  } = contact;

  const adifRecord: AdifRecord = {
    band,
    qsoDate,
    timeOn,
    stationCallsign,
    call,
    mode,
    freq,
    rstSent,
    rstRcvd,
  };

  return adifRecord;
}

function exportSotaContacts(contacts: ParserContact[], dest: string) {
  const sotaContacts = filterSota(contacts).map((c) => {
    const { sotaRef, mySotaRef } = c;
    const adifContact: AdifRecord = {
      ...baseContactToRecord(c),
      sotaRef,
      mySotaRef,
    };

    return adifContact;
  });

  writeContactsToFile(sotaContacts, dest);
}

function keyContactsBy(contacts: ParserContact[], key: keyof ParserContact) {
  const keyedContacts: Record<string, ParserContact[]> = {};
  contacts.forEach((contact) => {
    const keyValue = contact[key];
    if (keyValue) {
      const contactsForKey = keyedContacts[keyValue] || [];
      contactsForKey.push(contact);
      keyedContacts[keyValue] = contactsForKey;
    }
  });

  return keyedContacts;
}

function exportWwffContacts(contacts: ParserContact[], destDir: string) {
  const contactRefDate = keyContactsBy(contacts, "myWwffRef");

  Object.values(contactRefDate).forEach((contacts) => {
    const adifContacts: AdifRecord[] = contacts.map((c) => {
      const adifContact: AdifRecord = {
        ...baseContactToRecord(c),
        mySig: "WWFF",
        mySigInfo: c.myWwffRef,
      };

      if (c.wwffRef && c.wwffRef.length > 0) {
        adifContact.sig = "WWFF";
        adifContact.sigInfo = c.wwffRef;
      }

      return adifContact;
    });

    const first = adifContacts[0];
    if (first) {
      const dest = path.join(
        destDir,
        `${first.stationCallsign} @ ${first.mySigInfo} ${first.qsoDate}.adif`
      );
      writeContactsToFile(adifContacts, dest);
    }
  });
}

function exportPotaContacts(contacts: ParserContact[], destDir: string) {
  const contactRefDate = keyContactsBy(contacts, "myPotaRef");

  Object.values(contactRefDate).forEach((contacts) => {
    const adifContacts: AdifRecord[] = contacts.map((c) => {
      const adifContact: AdifRecord = {
        ...baseContactToRecord(c),
        mySig: "POTA",
        mySigInfo: c.myPotaRef,
      };

      if (c.potaRef && c.potaRef.length > 0) {
        adifContact.sig = "POTA";
        adifContact.sigInfo = c.potaRef;
      }

      return adifContact;
    });

    const first = adifContacts[0];
    if (first) {
      const dest = path.join(
        destDir,
        `${first.stationCallsign}@${first.mySigInfo}-${first.qsoDate}.adif`
      );
      writeContactsToFile(adifContacts, dest);
    }
  });
}

function exportLogs(logPath: string) {
  const contacts = parse(fs.readFileSync(logPath, "utf8"));

  const programs = ["mySotaRef"] as const;

  const refs: Record<typeof programs[number], string[]> = {
    mySotaRef: [],
  };

  programs.forEach((program) => {
    refs[program] = contacts
      .map((contact) => contact[program])
      .filter((c): c is string => typeof c === "string");
  });

  exportSotaContacts(contacts, `${logPath}.adif`);
  exportWwffContacts(contacts, path.dirname(logPath));
  exportPotaContacts(contacts, path.dirname(logPath));
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
      console.info(argv);
      exportLogs(argv.logs);
    }
  )
  .strictCommands()
  .demandCommand(1)
  .help()
  .parse();
