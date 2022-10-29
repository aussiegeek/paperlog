// generated by scripts/adif_tables.ts
import { enums, Infer } from "superstruct";

export const continent = [
  "NA", // North America
  "SA", // South America
  "EU", // Europe
  "AF", // Africa
  "OC", // Oceana
  "AS", // Asia
  "AN", // Antarctica
] as const;

export const ContinentEnum = enums(continent);
export type ContinentEnum = Infer<typeof ContinentEnum>;
