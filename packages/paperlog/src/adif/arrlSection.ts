// generated by scripts/adif_tables.ts
import { enums, Infer } from "superstruct";

export const arrlSection = [
  "AL", // Alabama
  "AK", // Alaska
  "AB", // Alberta
  "AR", // Arkansas
  "AZ", // Arizona
  "BC", // British Columbia
  "CO", // Colorado
  "CT", // Connecticut
  "DE", // Delaware
  "EB", // East Bay
  "EMA", // Eastern Massachusetts
  "ENY", // Eastern New York
  "EPA", // Eastern Pennsylvania
  "EWA", // Eastern Washington
  "GA", // Georgia
  "GTA", // Greater Toronto Area
  "ID", // Idaho
  "IL", // Illinois
  "IN", // Indiana
  "IA", // Iowa
  "KS", // Kansas
  "KY", // Kentucky
  "LAX", // Los Angeles
  "LA", // Louisiana
  "ME", // Maine
  "MB", // Manitoba
  "MAR", // Maritime
  "MDC", // Maryland-DC
  "MI", // Michigan
  "MN", // Minnesota
  "MS", // Mississippi
  "MO", // Missouri
  "MT", // Montana
  "NE", // Nebraska
  "NV", // Nevada
  "NH", // New Hampshire
  "NM", // New Mexico
  "NLI", // New York City-Long Island
  "NL", // Newfoundland/Labrador
  "NC", // North Carolina
  "ND", // North Dakota
  "NTX", // North Texas
  "NFL", // Northern Florida
  "NNJ", // Northern New Jersey
  "NNY", // Northern New York
  "NT", // Northwest Territories/Yukon/Nunavut
  "NWT", // Northwest Territories/Yukon/Nunavut
  "OH", // Ohio
  "OK", // Oklahoma
  "ON", // Ontario
  "ONE", // Ontario East
  "ONN", // Ontario North
  "ONS", // Ontario South
  "ORG", // Orange
  "OR", // Oregon
  "PAC", // Pacific
  "PR", // Puerto Rico
  "QC", // Quebec
  "RI", // Rhode Island
  "SV", // Sacramento Valley
  "SDG", // San Diego
  "SF", // San Francisco
  "SJV", // San Joaquin Valley
  "SB", // Santa Barbara
  "SCV", // Santa Clara Valley
  "SK", // Saskatchewan
  "SC", // South Carolina
  "SD", // South Dakota
  "STX", // South Texas
  "SFL", // Southern Florida
  "SNJ", // Southern New Jersey
  "TN", // Tennessee
  "VI", // US Virgin Islands
  "UT", // Utah
  "VT", // Vermont
  "VA", // Virginia
  "WCF", // West Central Florida
  "WTX", // West Texas
  "WV", // West Virginia
  "WMA", // Western Massachusetts
  "WNY", // Western New York
  "WPA", // Western Pennsylvania
  "WWA", // Western Washington
  "WI", // Wisconsin
  "WY", // Wyoming
] as const;

export const ArrlSectionEnum = enums(arrlSection);
export type ArrlSectionEnum = Infer<typeof ArrlSectionEnum>;