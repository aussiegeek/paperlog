import type { AdifRecord } from "./adif/adifRecord";

export function filterSota(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter(
    (contact) =>
      (contact.sotaRef !== undefined && contact.sotaRef !== "") ||
      (contact.mySotaRef !== undefined && contact.mySotaRef !== "")
  );
}

export function filterPota(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter(
    (contact) => contact["appPaperlogMyPotaRef"] !== undefined
  );
}

export function filterWwff(contacts: AdifRecord[]): AdifRecord[] {
  return contacts.filter((contact) => contact.myWwffRef !== undefined);
}
