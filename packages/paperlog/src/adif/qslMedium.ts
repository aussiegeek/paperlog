// generated by scripts/adif_tables.ts
import { enums, Infer, coerce, string } from "superstruct";

export const qslMedium = [
  "CARD", // QSO confirmation via paper QSL card
  "EQSL", // QSO confirmation via eQSL.cc
  "LOTW", // QSO confirmation via ARRL Logbook of the World
] as const;

export const QslMediumEnum = coerce(enums(qslMedium), string(), (value) => {
  const foundValue = qslMedium.find(
    (v) => v.toUpperCase() == value.toUpperCase()
  );

  return foundValue ?? value;
});

export type QslMediumEnum = Infer<typeof QslMediumEnum>;
