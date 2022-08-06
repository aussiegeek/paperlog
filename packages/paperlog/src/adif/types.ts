import { pattern, string } from "superstruct";

export type MultilineString = String;

export const AdifDate = pattern(string(), /^\d{8}$/);
export const AdifTime = pattern(string(), /^[0-2][0-9][0-5][0-9]$/);
