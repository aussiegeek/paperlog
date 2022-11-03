// generated by scripts/adif_tables.ts
import { enums, Infer } from "superstruct";

export const qslMedium = [
  "CARD", // QSO confirmation via paper QSL card
  "EQSL", // QSO confirmation via eQSL.cc
  "LOTW", // QSO confirmation via ARRL Logbook of the World
] as const;

export const QslMediumEnum = enums(qslMedium);
export type QslMediumEnum = Infer<typeof QslMediumEnum>;