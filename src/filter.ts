import type { ParserContact } from "./parse";

export function filterSota(contacts: ParserContact[]): ParserContact[] {
  return contacts.filter(
    (contact) =>
      (contact.sotaRef !== undefined && contact.sotaRef !== "") ||
      (contact.mySotaRef !== undefined && contact.mySotaRef !== "")
  );
}

export function filterPota(contacts: ParserContact[]): ParserContact[] {
  return contacts.filter((contact) => contact.myPotaRef !== undefined);
}

export function filterWwff(contacts: ParserContact[]): ParserContact[] {
  return contacts.filter((contact) => contact.myWwffRef !== undefined);
}
