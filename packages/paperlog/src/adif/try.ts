import { create, Describe, object, string } from "superstruct";

interface Contact {
  call: string;
}

type ContactWithCustom = Contact & Record<`app_${string}`, string>;

export const record: Describe<ContactWithCustom> = object({ call: string() });

export const r: ContactWithCustom = create(
  { call: "foo", app_pota: "foo" },
  record
);
