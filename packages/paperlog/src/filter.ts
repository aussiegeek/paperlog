import type { AdifRecord } from "./adif/adifRecord";
import { isPresent } from "./isPresent";

export function filterSota(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter(
    (contact) => isPresent(contact.sotaRef) || isPresent(contact.mySotaRef)
  );
}

export function filterPota(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter(
    (contact) => contact["appPaperlogMyPotaRef"] !== undefined
  );
}

export function filterWwff(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter((contact) => isPresent(contact.myWwffRef));
}
