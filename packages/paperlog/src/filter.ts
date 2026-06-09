import type { AdifRecord } from "./adif/adifRecord.js";
import { isPresent } from "./isPresent.js";

export function filterSota(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter(
    (contact) => isPresent(contact.sotaRef) || isPresent(contact.mySotaRef),
  );
}

export function filterPota(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter((contact) => contact.myPotaRef !== undefined);
}

export function filterWwff(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter((contact) => isPresent(contact.myWwffRef));
}
