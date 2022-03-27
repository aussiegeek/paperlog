import { enums } from "superstruct";

export const bands = [
  "2190m",
  "630m",
  "560m",
  "160m",
  "80m",
  "60m",
  "40m",
  "30m",
  "20m",
  "17m",
  "15m",
  "12m",
  "10m",
  "8m",
  "6m",
  "5m",
  "4m",
  "2m",
  "1.25m",
  "70cm",
  "33cm",
  "23cm",
  "13cm",
  "9cm",
  "6cm",
  "3cm",
  "1.25cm",
  "6mm",
  "4mm",
  "2.5mm",
  "2mm",
  "1mm",
] as const;

type BandRange = { [K in typeof bands[number]]: { from: number; to: number } };

const bandData: BandRange = {
  "2190m": { from: 0.1357, to: 0.1378 },
  "630m": { from: 0.472, to: 0.479 },
  "560m": { from: 0.501, to: 0.504 },
  "160m": { from: 1.8, to: 2.0 },
  "80m": { from: 3.5, to: 4.0 },
  "60m": { from: 5.06, to: 5.45 },
  "40m": { from: 7.0, to: 7.3 },
  "30m": { from: 10.1, to: 10.15 },
  "20m": { from: 14.0, to: 14.35 },
  "17m": { from: 18.068, to: 18.168 },
  "15m": { from: 21.0, to: 21.45 },
  "12m": { from: 24.89, to: 24.99 },
  "10m": { from: 28.0, to: 29.7 },
  "8m": { from: 40, to: 45 },
  "6m": { from: 50, to: 54 },
  "5m": { from: 54.000001, to: 69.9 },
  "4m": { from: 70, to: 71 },
  "2m": { from: 144, to: 148 },
  "1.25m": { from: 222, to: 225 },
  "70cm": { from: 420, to: 450 },
  "33cm": { from: 902, to: 928 },
  "23cm": { from: 1240, to: 1300 },
  "13cm": { from: 2300, to: 2450 },
  "9cm": { from: 3300, to: 3500 },
  "6cm": { from: 5650, to: 5925 },
  "3cm": { from: 10000, to: 10500 },
  "1.25cm": { from: 24000, to: 24250 },
  "6mm": { from: 47000, to: 47200 },
  "4mm": { from: 75500, to: 81000 },
  "2.5mm": { from: 119980, to: 123000 },
  "2mm": { from: 134000, to: 149000 },
  "1mm": { from: 241000, to: 250000 },
} as const;

export const BandEnum = enums(bands);

export const bandRange: BandRange = bandData;
