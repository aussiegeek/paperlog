import type { AdifRecord } from "./index.js";
import type { AdifFile } from "./adif.js";
import { filterSota } from "./index.js";
import { isPresent } from "./isPresent.js";

type ExportFileCollection = Record<string, AdifFile>;

export interface ExportLogResult {
  files: ExportFileCollection;
}

export function exportAdif({
  contacts,
  srcFileName,
}: {
  contacts: AdifRecord[];
  srcFileName: string;
}): ExportLogResult {
  let files: Record<string, AdifFile> = {
    [`${srcFileName}.all.adi`]: {
      records: contacts,
    },
  };

  const refs: Record<string, string[]> = {
    mySotaRef: [],
  };

  refs["mySotaRef"] = contacts
    .map((contact) => contact["mySotaRef"])
    .filter(isPresent);

  const sotaResult = exportSotaContacts(contacts);
  if (sotaResult) {
    files[`${srcFileName}.sota.adi`] = sotaResult;
  }
  files = {
    ...files,
    ...exportWwffContacts(contacts),
    ...exportPotaContacts(contacts),
  };

  return { files };
}

function exportSotaContacts(contacts: AdifRecord[]): AdifFile | null {
  const sotaContacts = filterSota(contacts).map((c) => {
    const { sotaRef, mySotaRef } = c;
    const adifContact: AdifRecord = {
      ...baseContactToRecord(c),
      sotaRef,
      mySotaRef,
    };

    return adifContact;
  });

  if (sotaContacts.length == 0) {
    return null;
  }

  return { records: sotaContacts };
}

function keyContactsBy(contacts: AdifRecord[], keys: Array<keyof AdifRecord>) {
  const keyedContacts: Record<string, AdifRecord[]> = {};
  contacts.forEach((contact) => {
    const keyValues = keys.map((key) => contact[key]);
    if (keyValues.some((v) => typeof v === "undefined")) {
      return;
    }
    const keyValue = keyValues.join("-");
    const contactsForKey = keyedContacts[keyValue] || [];
    contactsForKey.push(contact);
    keyedContacts[keyValue] = contactsForKey;
  });

  return keyedContacts;
}

function exportWwffContacts(contacts: AdifRecord[]): ExportFileCollection {
  const fileCollection: ExportFileCollection = {};
  const contactRefDate = keyContactsBy(contacts, ["qsoDate", "myWwffRef"]);

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
      fileCollection[
        `${first.stationCallsign} @ ${first.mySigInfo} ${first.qsoDate}.adi`
      ] = { records: adifContacts };
    }
  });
  return fileCollection;
}

function exportPotaContacts(contacts: AdifRecord[]): ExportFileCollection {
  const fileCollection: ExportFileCollection = {};
  const contactRefDate = keyContactsBy(contacts, ["myPotaRef"]);

  Object.values(contactRefDate).forEach((contacts) => {
    const adifContacts: AdifRecord[] = contacts.map((c) => {
      const adifContact: AdifRecord = {
        ...baseContactToRecord(c),
        myPotaRef: c.myPotaRef,
      };

      if (c.potaRef && c.potaRef.length > 0) {
        adifContact.potaRef = c.potaRef;
      }

      return adifContact;
    });

    const dates = adifContacts
      .map(({ qsoDate }) => qsoDate)
      .filter((qsoDate) => typeof qsoDate === "string")
      .sort();
    const first = adifContacts[0];
    if (first) {
      fileCollection[
        `${first.stationCallsign}@${first.myPotaRef}-${dates[0]}.adi`
      ] = { records: adifContacts };
    }
  });

  return fileCollection;
}

function baseContactToRecord(contact: AdifRecord): AdifRecord {
  const {
    band,
    qsoDate,
    timeOn,
    stationCallsign,
    operator,
    call,
    mode,
    freq,
    rstSent,
    rstRcvd,
    gridsquare,
    myGridsquare,
  } = contact;

  const adifRecord: AdifRecord = {
    band,
    qsoDate,
    timeOn,
    stationCallsign,
    operator,
    call,
    mode,
    freq,
    rstSent,
    rstRcvd,
    gridsquare,
    myGridsquare,
  };

  return adifRecord;
}
