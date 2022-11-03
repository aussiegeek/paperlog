// generated by scripts/adif_tables.ts
import {
  antPathEnumArb,
  arrlSectionEnumArb,
  bandEnumArb,
  booleanArb,
  continentEnumArb,
  creditListArb,
  dateArb,
  dxccEntityCodeEnumArb,
  gridSquareArb,
  gridSquareListArb,
  integerArb,
  intlMultilineStringArb,
  intlStringArb,
  iotaRefNoArb,
  locationArb,
  modeEnumArb,
  multilineStringArb,
  numberArb,
  positiveIntegerArb,
  primaryAdministrativeSubdivisionEnumArb,
  propagationModeEnumArb,
  qslRcvdEnumArb,
  qslSentEnumArb,
  qslViaEnumArb,
  qsoCompleteEnumArb,
  qsoUploadStatusEnumArb,
  regionEnumArb,
  secondaryAdministrativeSubdivisionEnumArb,
  secondarySubdivisionListArb,
  sotaRefArb,
  sponsoredAwardListArb,
  stringArb,
  timeArb,
  wwffRefArb,
} from "./adifFieldArbs";

export const adifRecordArbs = {
  address: multilineStringArb,
  addressIntl: intlMultilineStringArb,
  age: numberArb,
  aIndex: numberArb,
  antAz: numberArb,
  antEl: numberArb,
  antPath: antPathEnumArb,
  arrlSect: arrlSectionEnumArb,
  awardSubmitted: sponsoredAwardListArb,
  awardGranted: sponsoredAwardListArb,
  band: bandEnumArb,
  bandRx: bandEnumArb,
  call: stringArb,
  check: stringArb,
  class: stringArb,
  clublogQsoUploadDate: dateArb,
  clublogQsoUploadStatus: qsoUploadStatusEnumArb,
  cnty: secondaryAdministrativeSubdivisionEnumArb,
  comment: stringArb,
  commentIntl: intlStringArb,
  cont: continentEnumArb,
  contactedOp: stringArb,
  contestId: stringArb,
  country: stringArb,
  countryIntl: intlStringArb,
  cqz: positiveIntegerArb,
  creditSubmitted: creditListArb,
  creditGranted: creditListArb,
  darcDok: stringArb,
  distance: numberArb,
  dxcc: dxccEntityCodeEnumArb,
  email: stringArb,
  eqCall: stringArb,
  eqslQslrdate: dateArb,
  eqslQslsdate: dateArb,
  eqslQslRcvd: qslRcvdEnumArb,
  eqslQslSent: qslSentEnumArb,
  fists: positiveIntegerArb,
  fistsCc: positiveIntegerArb,
  forceInit: booleanArb,
  freq: numberArb,
  freqRx: numberArb,
  gridsquare: gridSquareArb,
  hrdlogQsoUploadDate: dateArb,
  hrdlogQsoUploadStatus: qsoUploadStatusEnumArb,
  iota: iotaRefNoArb,
  iotaIslandId: positiveIntegerArb,
  ituz: positiveIntegerArb,
  kIndex: integerArb,
  lat: locationArb,
  lon: locationArb,
  lotwQslrdate: dateArb,
  lotwQslsdate: dateArb,
  lotwQslRcvd: qslRcvdEnumArb,
  lotwQslSent: qslSentEnumArb,
  maxBursts: numberArb,
  mode: modeEnumArb,
  msShower: stringArb,
  myAntenna: stringArb,
  myAntennaIntl: intlStringArb,
  myArrlSect: arrlSectionEnumArb,
  myCity: stringArb,
  myCityIntl: intlStringArb,
  myCnty: secondaryAdministrativeSubdivisionEnumArb,
  myCountry: stringArb,
  myCountryIntl: intlStringArb,
  myCqZone: positiveIntegerArb,
  myDxcc: dxccEntityCodeEnumArb,
  myFists: positiveIntegerArb,
  myGridsquare: gridSquareArb,
  myIota: iotaRefNoArb,
  myIotaIslandId: positiveIntegerArb,
  myItuZone: positiveIntegerArb,
  myLat: locationArb,
  myLon: locationArb,
  myName: stringArb,
  myNameIntl: intlStringArb,
  myPostalCode: stringArb,
  myPostalCodeIntl: intlStringArb,
  myRig: stringArb,
  myRigIntl: intlStringArb,
  mySig: stringArb,
  mySigIntl: intlStringArb,
  mySigInfo: stringArb,
  mySigInfoIntl: intlStringArb,
  mySotaRef: sotaRefArb,
  myState: primaryAdministrativeSubdivisionEnumArb,
  myStreet: stringArb,
  myStreetIntl: intlStringArb,
  myUsacaCounties: secondarySubdivisionListArb,
  myVuccGrids: gridSquareListArb,
  myWwffRef: wwffRefArb,
  name: stringArb,
  nameIntl: intlStringArb,
  notes: multilineStringArb,
  notesIntl: intlMultilineStringArb,
  nrBursts: integerArb,
  nrPings: integerArb,
  operator: stringArb,
  ownerCallsign: stringArb,
  pfx: stringArb,
  precedence: stringArb,
  propMode: propagationModeEnumArb,
  publicKey: stringArb,
  qrzcomQsoUploadDate: dateArb,
  qrzcomQsoUploadStatus: qsoUploadStatusEnumArb,
  qslmsg: multilineStringArb,
  qslmsgIntl: intlMultilineStringArb,
  qslrdate: dateArb,
  qslsdate: dateArb,
  qslRcvd: qslRcvdEnumArb,
  qslRcvdVia: qslViaEnumArb,
  qslSent: qslSentEnumArb,
  qslSentVia: qslViaEnumArb,
  qslVia: stringArb,
  qsoComplete: qsoCompleteEnumArb,
  qsoDate: dateArb,
  qsoDateOff: dateArb,
  qsoRandom: booleanArb,
  qth: stringArb,
  qthIntl: intlStringArb,
  region: regionEnumArb,
  rig: multilineStringArb,
  rigIntl: intlMultilineStringArb,
  rstRcvd: stringArb,
  rstSent: stringArb,
  rxPwr: numberArb,
  satMode: stringArb,
  satName: stringArb,
  sfi: integerArb,
  sig: stringArb,
  sigIntl: intlStringArb,
  sigInfo: stringArb,
  sigInfoIntl: intlStringArb,
  silentKey: booleanArb,
  skcc: stringArb,
  sotaRef: sotaRefArb,
  srx: integerArb,
  srxString: stringArb,
  state: primaryAdministrativeSubdivisionEnumArb,
  stationCallsign: stringArb,
  stx: integerArb,
  stxString: stringArb,
  submode: stringArb,
  swl: booleanArb,
  tenTen: positiveIntegerArb,
  timeOff: timeArb,
  timeOn: timeArb,
  txPwr: numberArb,
  uksmg: positiveIntegerArb,
  usacaCounties: secondarySubdivisionListArb,
  vuccGrids: gridSquareListArb,
  web: stringArb,
  wwffRef: wwffRefArb,
};