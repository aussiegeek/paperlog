// generated by scripts/adif_tables.ts
import { enums, Infer } from "superstruct";

export const qslVia = [
  "B", // bureau
  "D", // direct
  "E", // electronic
  "M", // manager
] as const;

export const QslViaEnum = enums(qslVia);
export type QslViaEnum = Infer<typeof QslViaEnum>;