// generated by scripts/adif_tables.ts
import { enums, Infer, coerce, string } from "superstruct";

export const credit = [
  "CQDX", // DX
  "CQDX_BAND", // DX
  "CQDX_MODE", // DX
  "CQDX_MOBILE", // DX
  "CQDX_QRP", // DX
  "CQDX_SATELLITE", // DX
  "CQDXFIELD", // DX Field
  "CQDXFIELD_BAND", // DX Field
  "CQDXFIELD_MODE", // DX Field
  "CQDXFIELD_MOBILE", // DX Field
  "CQDXFIELD_QRP", // DX Field
  "CQDXFIELD_SATELLITE", // DX Field
  "CQWAZ_MIXED", // Worked All Zones (WAZ)
  "CQWAZ_BAND", // Worked All Zones (WAZ)
  "CQWAZ_MODE", // Worked All Zones (WAZ)
  "CQWAZ_SATELLITE", // Worked All Zones (WAZ)
  "CQWAZ_EME", // Worked All Zones (WAZ)
  "CQWAZ_MOBILE", // Worked All Zones (WAZ)
  "CQWAZ_QRP", // Worked All Zones (WAZ)
  "CQWPX", // WPX
  "CQWPX_BAND", // WPX
  "CQWPX_MODE", // WPX
  "DXCC", // DX Century Club (DXCC)
  "DXCC_BAND", // DX Century Club (DXCC)
  "DXCC_MODE", // DX Century Club (DXCC)
  "DXCC_SATELLITE", // DX Century Club (DXCC)
  "EAUSTRALIA", // eAustralia
  "ECANADA", // eCanada
  "ECOUNTY_STATE", // eCounty
  "EDX", // eDX
  "EDX100", // eDX100
  "EDX100_BAND", // eDX100
  "EDX100_MODE", // eDX100
  "EECHOLINK50", // eEcholink50
  "EGRID_BAND", // eGrid
  "EGRID_SATELLITE", // eGrid
  "EPFX300", // ePfx300
  "EPFX300_MODE", // ePfx300
  "EWAS", // eWAS
  "EWAS_BAND", // eWAS
  "EWAS_MODE", // eWAS
  "EWAS_SATELLITE", // eWAS
  "EZ40", // eZ40
  "EZ40_MODE", // eZ40
  "FFMA", // Fred Fish Memorial Award (FFMA)
  "IOTA", // Islands on the Air (IOTA)
  "IOTA_BASIC", // Islands on the Air (IOTA)
  "IOTA_CONT", // Islands on the Air (IOTA)
  "IOTA_GROUP", // Islands on the Air (IOTA)
  "RDA", // Russian Districts Award (RDA)
  "USACA", // United States of America Counties (USA-CA)
  "VUCC_BAND", // VHF/UHF Century Club Program (VUCC)
  "VUCC_SATELLITE", // VHF/UHF Century Club Program (VUCC)
  "WAB", // Worked All Britain (WAB)
  "WAC", // Worked All Continents (WAC)
  "WAC_BAND", // Worked All Continents (WAC)
  "WAE", // Worked All Europe (WAE)
  "WAE_BAND", // Worked All Europe (WAE)
  "WAE_MODE", // Worked All Europe (WAE)
  "WAIP", // Worked All Italian Provinces (WAIP)
  "WAIP_BAND", // Worked All Italian Provinces (WAIP)
  "WAIP_MODE", // Worked All Italian Provinces (WAIP)
  "WAS", // Worked All States (WAS)
  "WAS_BAND", // Worked All States (WAS)
  "WAS_EME", // Worked All States (WAS)
  "WAS_MODE", // Worked All States (WAS)
  "WAS_NOVICE", // Worked All States (WAS)
  "WAS_QRP", // Worked All States (WAS)
  "WAS_SATELLITE", // Worked All States (WAS)
  "WITUZ", // Worked ITU Zones (WITUZ)
  "WITUZ_BAND", // Worked ITU Zones (WITUZ)
] as const;

export const CreditEnum = coerce(enums(credit), string(), (value) => {
  const foundValue = credit.find((v) => v.toUpperCase() == value.toUpperCase());

  return foundValue ?? value;
});

export type CreditEnum = Infer<typeof CreditEnum>;
