// generated by scripts/adif_tables.ts
import { optional, Describe, type } from "superstruct";
import {
  Boolean,
  CreditList,
  Date,
  GridSquare,
  GridSquareList,
  Integer,
  IntlMultilineString,
  IntlString,
  IOTARefNo,
  Location,
  MultilineString,
  ModeEnum,
  Number,
  PositiveInteger,
  SecondarySubdivisionList,
  SponsoredAwardList,
  SOTARef,
  String,
  Time,
  WWFFRef,
} from "./types";
import { AntPathEnum } from "./antPath";
import { ArrlSectionEnum } from "./arrlSection";
import { BandEnum } from "./bands";
import { ContinentEnum } from "./continent";
import { DxccEntityCodeEnum } from "./dxccEntityCode";
import { PrimaryAdministrativeSubdivisionEnum } from "./primaryAdministrativeSubdivision";
import { PropagationModeEnum } from "./propagationMode";
import { QslRcvdEnum } from "./qslRcvd";
import { QslSentEnum } from "./qslSent";
import { QslViaEnum } from "./qslVia";
import { QsoCompleteEnum } from "./qsoComplete";
import { QsoUploadStatusEnum } from "./qsoUploadStatus";
import { RegionEnum } from "./region";
import { SecondaryAdministrativeSubdivisionEnum } from "./secondaryAdministrativeSubdivision";
import type Decimal from "decimal.js";

export const adifRecordKeys = [
  "address",
  "addressIntl",
  "age",
  "aIndex",
  "antAz",
  "antEl",
  "antPath",
  "arrlSect",
  "awardSubmitted",
  "awardGranted",
  "band",
  "bandRx",
  "call",
  "check",
  "class",
  "clublogQsoUploadDate",
  "clublogQsoUploadStatus",
  "cnty",
  "comment",
  "commentIntl",
  "cont",
  "contactedOp",
  "contestId",
  "country",
  "countryIntl",
  "cqz",
  "creditSubmitted",
  "creditGranted",
  "darcDok",
  "distance",
  "dxcc",
  "email",
  "eqCall",
  "eqslQslrdate",
  "eqslQslsdate",
  "eqslQslRcvd",
  "eqslQslSent",
  "fists",
  "fistsCc",
  "forceInit",
  "freq",
  "freqRx",
  "gridsquare",
  "hrdlogQsoUploadDate",
  "hrdlogQsoUploadStatus",
  "iota",
  "iotaIslandId",
  "ituz",
  "kIndex",
  "lat",
  "lon",
  "lotwQslrdate",
  "lotwQslsdate",
  "lotwQslRcvd",
  "lotwQslSent",
  "maxBursts",
  "mode",
  "msShower",
  "myAntenna",
  "myAntennaIntl",
  "myArrlSect",
  "myCity",
  "myCityIntl",
  "myCnty",
  "myCountry",
  "myCountryIntl",
  "myCqZone",
  "myDxcc",
  "myFists",
  "myGridsquare",
  "myIota",
  "myIotaIslandId",
  "myItuZone",
  "myLat",
  "myLon",
  "myName",
  "myNameIntl",
  "myPostalCode",
  "myPostalCodeIntl",
  "myRig",
  "myRigIntl",
  "mySig",
  "mySigIntl",
  "mySigInfo",
  "mySigInfoIntl",
  "mySotaRef",
  "myState",
  "myStreet",
  "myStreetIntl",
  "myUsacaCounties",
  "myVuccGrids",
  "myWwffRef",
  "name",
  "nameIntl",
  "notes",
  "notesIntl",
  "nrBursts",
  "nrPings",
  "operator",
  "ownerCallsign",
  "pfx",
  "precedence",
  "propMode",
  "publicKey",
  "qrzcomQsoUploadDate",
  "qrzcomQsoUploadStatus",
  "qslmsg",
  "qslmsgIntl",
  "qslrdate",
  "qslsdate",
  "qslRcvd",
  "qslRcvdVia",
  "qslSent",
  "qslSentVia",
  "qslVia",
  "qsoComplete",
  "qsoDate",
  "qsoDateOff",
  "qsoRandom",
  "qth",
  "qthIntl",
  "region",
  "rig",
  "rigIntl",
  "rstRcvd",
  "rstSent",
  "rxPwr",
  "satMode",
  "satName",
  "sfi",
  "sig",
  "sigIntl",
  "sigInfo",
  "sigInfoIntl",
  "silentKey",
  "skcc",
  "sotaRef",
  "srx",
  "srxString",
  "state",
  "stationCallsign",
  "stx",
  "stxString",
  "submode",
  "swl",
  "tenTen",
  "timeOff",
  "timeOn",
  "txPwr",
  "uksmg",
  "usacaCounties",
  "vuccGrids",
  "web",
  "wwffRef",
] as const;

export interface AdifRecord extends Record<`app${string}`, string | undefined> {
  // the contacted station's complete mailing address: full name, street address, city, postal code, and country
  address?: string | undefined;
  // the contacted station's complete mailing address: full name, street address, city, postal code, and country
  addressIntl?: string | undefined;
  // the contacted station's operator's age in years in the range 0 to 120 (inclusive)
  age?: Decimal | undefined;
  // the geomagnetic A index at the time of the QSO in the range 0 to 400 (inclusive)
  aIndex?: Decimal | undefined;
  // the logging station's antenna azimuth, in degrees with a value between 0 to 360 (inclusive). Values outside this range are import-only and must be normalized for export (e.g. 370 is exported as 10). True north is 0 degrees with values increasing in a clockwise direction.
  antAz?: Decimal | undefined;
  // the logging station's antenna elevation, in degrees with a value between -90 to 90 (inclusive). Values outside this range are import-only and must be normalized for export (e.g. 100 is exported as 80). The horizon is 0 degrees with values increasing as the angle moves in an upward direction.
  antEl?: Decimal | undefined;
  // the signal path
  antPath?: AntPathEnum | undefined;
  // the contacted station's ARRL section
  arrlSect?: ArrlSectionEnum | undefined;
  // the list of awards submitted to a sponsor. note that this field might not be used in a QSO record. It might be used to convey information about a user’s “Award Account” between an award sponsor and the user. For example, AA6YQ might submit a request for awards by sending the following: <CALL:5>AA6YQ <AWARD_SUBMITTED:64>ADIF_CENTURY_BASIC,ADIF_CENTURY_SILVER,ADIF_SPECTRUM_100-160m
  awardSubmitted?: string | undefined;
  // the list of awards granted by a sponsor. note that this field might not be used in a QSO record. It might be used to convey information about a user’s “Award Account” between an award sponsor and the user. For example, in response to a request “send me a list of the awards granted to AA6YQ”, this might be received: <CALL:5>AA6YQ <AWARD_GRANTED:64>ADIF_CENTURY_BASIC,ADIF_CENTURY_SILVER,ADIF_SPECTRUM_100-160m
  awardGranted?: string | undefined;
  // QSO Band
  band?: BandEnum | undefined;
  // in a split frequency QSO, the logging station's receiving band
  bandRx?: BandEnum | undefined;
  // the contacted station's Callsign
  call?: string | undefined;
  // contest check (e.g. for ARRL Sweepstakes)
  check?: string | undefined;
  // contest class (e.g. for ARRL Field Day)
  class?: string | undefined;
  // the date the QSO was last uploaded to the Club Log online service
  clublogQsoUploadDate?: string | undefined;
  // the upload status of the QSO on the Club Log online service
  clublogQsoUploadStatus?: QsoUploadStatusEnum | undefined;
  // the contacted station's Secondary Administrative Subdivision (e.g. US county, JA Gun), in the specified format
  cnty?: SecondaryAdministrativeSubdivisionEnum | undefined;
  // comment field for QSO recommended use: information of interest to the contacted station's operator
  comment?: string | undefined;
  // comment field for QSO recommended use: information of interest to the contacted station's operator
  commentIntl?: string | undefined;
  // the contacted station's Continent
  cont?: ContinentEnum | undefined;
  // the callsign of the individual operating the contacted station
  contactedOp?: string | undefined;
  // QSO Contest Identifier use enumeration values for interoperability
  contestId?: string | undefined;
  // the contacted station's DXCC entity name
  country?: string | undefined;
  // the contacted station's DXCC entity name
  countryIntl?: string | undefined;
  // the contacted station's CQ Zone in the range 1 to 40 (inclusive)
  cqz?: number | undefined;
  // the list of credits sought for this QSO Use of data type AwardList and enumeration Award are import-only
  creditSubmitted?: CreditList | undefined;
  // the list of credits granted to this QSO Use of data type AwardList and enumeration Award are import-only
  creditGranted?: CreditList | undefined;
  // the contacted station's DARC DOK (District Location Code) A DOK comprises letters and numbers, e.g. <DARC_DOK:3>A01
  darcDok?: string | undefined;
  // the distance between the logging station and the contacted station in kilometers via the specified signal path with a value greater than or equal to 0
  distance?: Decimal | undefined;
  // the contacted station's DXCC Entity Code <DXCC:1>0 means that the contacted station is known not to be within a DXCC entity.
  dxcc?: DxccEntityCodeEnum | undefined;
  // the contacted station's email address
  email?: string | undefined;
  // the contacted station's owner's callsign
  eqCall?: string | undefined;
  // date QSL received from eQSL.cc (only valid if EQSL_QSL_RCVD is Y, I, or V)(V import-only)
  eqslQslrdate?: string | undefined;
  // date QSL sent to eQSL.cc (only valid if EQSL_QSL_SENT is Y, Q, or I)
  eqslQslsdate?: string | undefined;
  // eQSL.cc QSL received status instead of V (import-only) use <CREDIT_GRANTED:42>CQWAZ:eqsl,CQWAZ_BAND:eqsl,CQWAZ_MODE:eqsl Default Value: N
  eqslQslRcvd?: QslRcvdEnum | undefined;
  // eQSL.cc QSL sent status Default Value: N
  eqslQslSent?: QslSentEnum | undefined;
  // the contacted station's FISTS CW Club member number with a value greater than 0.
  fists?: number | undefined;
  // the contacted station's FISTS CW Club Century Certificate (CC) number with a value greater than 0.
  fistsCc?: number | undefined;
  // new EME "initial"
  forceInit?: boolean | undefined;
  // QSO frequency in Megahertz
  freq?: Decimal | undefined;
  // in a split frequency QSO, the logging station's receiving frequency in Megahertz
  freqRx?: Decimal | undefined;
  // the contacted station's 2-character, 4-character, 6-character, or 8-character Maidenhead Grid Square
  gridsquare?: string | undefined;
  // the date the QSO was last uploaded to the HRDLog.net online service
  hrdlogQsoUploadDate?: string | undefined;
  // the upload status of the QSO on the HRDLog.net online service
  hrdlogQsoUploadStatus?: QsoUploadStatusEnum | undefined;
  // the contacted station's IOTA designator, in format CC-XXX, where CC is a member of the Continent enumeration XXX is the island group designator, where 1 <= XXX <= 999 [use leading zeroes]
  iota?: string | undefined;
  // the contacted station's IOTA Island Identifier, an 8-digit integer in the range 1 to 99999999 [leading zeroes optional]
  iotaIslandId?: number | undefined;
  // the contacted station's ITU zone in the range 1 to 90 (inclusive)
  ituz?: number | undefined;
  // the geomagnetic K index at the time of the QSO in the range 0 to 9 (inclusive)
  kIndex?: number | undefined;
  // the contacted station's latitude
  lat?: string | undefined;
  // the contacted station's longitude
  lon?: string | undefined;
  // date QSL received from ARRL Logbook of the World (only valid if LOTW_QSL_RCVD is Y, I, or V)(V import-only)
  lotwQslrdate?: string | undefined;
  // date QSL sent to ARRL Logbook of the World (only valid if LOTW_QSL_SENT is Y, Q, or I)
  lotwQslsdate?: string | undefined;
  // ARRL Logbook of the World QSL received status instead of V (import-only) use <CREDIT_GRANTED:39>DXCC:lotw,DXCC_BAND:lotw,DXCC_MODE:lotw Default Value: N
  lotwQslRcvd?: QslRcvdEnum | undefined;
  // ARRL Logbook of the World QSL sent status Default Value: N
  lotwQslSent?: QslSentEnum | undefined;
  // maximum length of meteor scatter bursts heard by the logging station, in seconds with a value greater than or equal to 0
  maxBursts?: Decimal | undefined;
  // QSO Mode
  mode?: ModeEnum | undefined;
  // For Meteor Scatter QSOs, the name of the meteor shower in progress
  msShower?: string | undefined;
  // the logging station's antenna
  myAntenna?: string | undefined;
  // the logging station's antenna
  myAntennaIntl?: string | undefined;
  // the logging station's ARRL section
  myArrlSect?: ArrlSectionEnum | undefined;
  // the logging station's city
  myCity?: string | undefined;
  // the logging station's city
  myCityIntl?: string | undefined;
  // the logging station's Secondary Administrative Subdivision (e.g. US county, JA Gun), in the specified format
  myCnty?: SecondaryAdministrativeSubdivisionEnum | undefined;
  // the logging station's DXCC entity name
  myCountry?: string | undefined;
  // the logging station's DXCC entity name
  myCountryIntl?: string | undefined;
  // the logging station's CQ Zone in the range 1 to 40 (inclusive)
  myCqZone?: number | undefined;
  // the logging station's DXCC Entity Code <MY_DXCC:1>0 means that the logging station is known not to be within a DXCC entity.
  myDxcc?: DxccEntityCodeEnum | undefined;
  // the logging station's FISTS CW Club member number with a value greater than 0.
  myFists?: number | undefined;
  // the logging station's 2-character, 4-character, 6-character, or 8-character Maidenhead Grid Square
  myGridsquare?: string | undefined;
  // the logging station's IOTA designator, in format CC-XXX, where CC is a member of the Continent enumeration XXX is the island group designator, where 1 <= XXX <= 999 [use leading zeroes]
  myIota?: string | undefined;
  // the logging station's IOTA Island Identifier, an 8-digit integer in the range 1 to 99999999 [leading zeroes optional]
  myIotaIslandId?: number | undefined;
  // the logging station's ITU zone in the range 1 to 90 (inclusive)
  myItuZone?: number | undefined;
  // the logging station's latitude
  myLat?: string | undefined;
  // the logging station's longitude
  myLon?: string | undefined;
  // the logging operator's name
  myName?: string | undefined;
  // the logging operator's name
  myNameIntl?: string | undefined;
  // the logging station's postal code
  myPostalCode?: string | undefined;
  // the logging station's postal code
  myPostalCodeIntl?: string | undefined;
  // description of the logging station's equipment
  myRig?: string | undefined;
  // description of the logging station's equipment
  myRigIntl?: string | undefined;
  // special interest activity or event
  mySig?: string | undefined;
  // special interest activity or event
  mySigIntl?: string | undefined;
  // special interest activity or event information
  mySigInfo?: string | undefined;
  // special interest activity or event information
  mySigInfoIntl?: string | undefined;
  // the logging station's International SOTA Reference.
  mySotaRef?: string | undefined;
  // the code for the logging station's Primary Administrative Subdivision (e.g. US State, JA Island, VE Province)
  myState?: PrimaryAdministrativeSubdivisionEnum | undefined;
  // the logging station's street
  myStreet?: string | undefined;
  // the logging station's street
  myStreetIntl?: string | undefined;
  // two US counties in the case where the logging station is located on a border between two counties, representing counties that the contacted station may claim for the CQ Magazine USA-CA award program. E.g. MA,Franklin:MA,Hampshire
  myUsacaCounties?: string | undefined;
  // two or four adjacent Maidenhead grid locators, each four characters long, representing the logging station's grid squares that the contacted station may claim for the ARRL VUCC award program. E.g. EN98,FM08,EM97,FM07
  myVuccGrids?: string | undefined;
  // the logging station's WWFF (World Wildlife Flora & Fauna) reference
  myWwffRef?: string | undefined;
  // the contacted station's operator's name
  name?: string | undefined;
  // the contacted station's operator's name
  nameIntl?: string | undefined;
  // QSO notes recommended use: information of interest to the logging station's operator
  notes?: string | undefined;
  // QSO notes recommended use: information of interest to the logging station's operator
  notesIntl?: string | undefined;
  // the number of meteor scatter bursts heard by the logging station with a value greater than or equal to 0
  nrBursts?: number | undefined;
  // the number of meteor scatter pings heard by the logging station with a value greater than or equal to 0
  nrPings?: number | undefined;
  // the logging operator's callsign if STATION_CALLSIGN is absent, OPERATOR shall be treated as both the logging station's callsign and the logging operator's callsign
  operator?: string | undefined;
  // the callsign of the owner of the station used to log the contact (the callsign of the OPERATOR's host) if OWNER_CALLSIGN is absent, STATION_CALLSIGN shall be treated as both the logging station's callsign and the callsign of the owner of the station
  ownerCallsign?: string | undefined;
  // the contacted station's WPX prefix
  pfx?: string | undefined;
  // contest precedence (e.g. for ARRL Sweepstakes)
  precedence?: string | undefined;
  // QSO propagation mode
  propMode?: PropagationModeEnum | undefined;
  // public encryption key
  publicKey?: string | undefined;
  // the date the QSO was last uploaded to the QRZ.COM online service
  qrzcomQsoUploadDate?: string | undefined;
  // the upload status of the QSO on the QRZ.COM online service
  qrzcomQsoUploadStatus?: QsoUploadStatusEnum | undefined;
  // QSL card message
  qslmsg?: string | undefined;
  // QSL card message
  qslmsgIntl?: string | undefined;
  // QSL received date (only valid if QSL_RCVD is Y, I, or V)(V import-only)
  qslrdate?: string | undefined;
  // QSL sent date (only valid if QSL_SENT is Y, Q, or I)
  qslsdate?: string | undefined;
  // QSL received status instead of V (import-only) use <CREDIT_GRANTED:39>DXCC:card,DXCC_BAND:card,DXCC_MODE:card Default Value: N
  qslRcvd?: QslRcvdEnum | undefined;
  // if QSL_RCVD is set to 'Y' or 'V', the means by which the QSL was received by the logging station; otherwise, the means by which the logging station requested or intends to request that the QSL be conveyed. (Note: ‘V’ is import-only) use of M (manager) is import-only
  qslRcvdVia?: QslViaEnum | undefined;
  // QSL sent status Default Value: N
  qslSent?: QslSentEnum | undefined;
  // if QSL_SENT is set to 'Y', the means by which the QSL was sent by the logging station; otherwise, the means by which the logging station intends to convey the QSL use of M (manager) is import-only
  qslSentVia?: QslViaEnum | undefined;
  // the contacted station's QSL route
  qslVia?: string | undefined;
  // indicates whether the QSO was complete from the perspective of the logging station Y - yes N - no NIL - not heard ? - uncertain
  qsoComplete?: QsoCompleteEnum | undefined;
  // date on which the QSO started
  qsoDate?: string | undefined;
  // date on which the QSO ended
  qsoDateOff?: string | undefined;
  // indicates whether the QSO was random or scheduled
  qsoRandom?: boolean | undefined;
  // the contacted station's city
  qth?: string | undefined;
  // the contacted station's city
  qthIntl?: string | undefined;
  // the contacted station’s WAE or CQ entity contained within a DXCC entity. the value None indicates that the WAE or CQ entity is the DXCC entity in the DXCC field. nothing can be inferred from the absence of the REGION field
  region?: RegionEnum | undefined;
  // description of the contacted station's equipment
  rig?: string | undefined;
  // description of the contacted station's equipment
  rigIntl?: string | undefined;
  // signal report from the contacted station
  rstRcvd?: string | undefined;
  // signal report sent to the contacted station
  rstSent?: string | undefined;
  // the contacted station's transmitter power in Watts with a value greater than 0
  rxPwr?: Decimal | undefined;
  // satellite mode
  satMode?: string | undefined;
  // name of satellite
  satName?: string | undefined;
  // the solar flux at the time of the QSO in the range 0 to 300 (inclusive).
  sfi?: number | undefined;
  // the name of the contacted station's special activity or interest group
  sig?: string | undefined;
  // the name of the contacted station's special activity or interest group
  sigIntl?: string | undefined;
  // information associated with the contacted station's activity or interest group
  sigInfo?: string | undefined;
  // information associated with the contacted station's activity or interest group
  sigInfoIntl?: string | undefined;
  // 'Y' indicates that the contacted station's operator is now a Silent Key.
  silentKey?: boolean | undefined;
  // the contacted station's Straight Key Century Club (SKCC) member information
  skcc?: string | undefined;
  // the contacted station's International SOTA Reference.
  sotaRef?: string | undefined;
  // contest QSO received serial number with a value greater than or equal to 0
  srx?: number | undefined;
  // contest QSO received information use Cabrillo format to convey contest information for which ADIF fields are not specified in the event of a conflict between information in a dedicated contest field and this field, information in the dedicated contest field shall prevail
  srxString?: string | undefined;
  // the code for the contacted station's Primary Administrative Subdivision (e.g. US State, JA Island, VE Province)
  state?: PrimaryAdministrativeSubdivisionEnum | undefined;
  // the logging station's callsign (the callsign used over the air) if STATION_CALLSIGN is absent, OPERATOR shall be treated as both the logging station's callsign and the logging operator's callsign
  stationCallsign?: string | undefined;
  // contest QSO transmitted serial number with a value greater than or equal to 0
  stx?: number | undefined;
  // contest QSO transmitted information use Cabrillo format to convey contest information for which ADIF fields are not specified in the event of a conflict between information in a dedicated contest field and this field, information in the dedicated contest field shall prevail
  stxString?: string | undefined;
  // QSO Submode use enumeration values for interoperability
  submode?: string | undefined;
  // indicates that the QSO information pertains to an SWL report
  swl?: boolean | undefined;
  // Ten-Ten number with a value greater than 0
  tenTen?: number | undefined;
  // HHMM or HHMMSS in UTC in the absence of <QSO_DATE_OFF>, the QSO duration is less than 24 hours. For example, the following is a QSO starting at 14 July 2020 23:55 and finishing at 15 July 2020 01:00: <QSO_DATE:8>20200714 <TIME_ON:4>2355 <TIME_OFF:4>0100
  timeOff?: string | undefined;
  // HHMM or HHMMSS in UTC
  timeOn?: string | undefined;
  // the logging station's power in Watts with a value greater than 0
  txPwr?: Decimal | undefined;
  // the contacted station's UKSMG member number with a value greater than 0
  uksmg?: number | undefined;
  // two US counties in the case where the contacted station is located on a border between two counties, representing counties credited to the QSO for the CQ Magazine USA-CA award program. E.g. MA,Franklin:MA,Hampshire
  usacaCounties?: string | undefined;
  // two or four adjacent Maidenhead grid locators, each four characters long, representing the contacted station's grid squares credited to the QSO for the ARRL VUCC award program. E.g. EN98,FM08,EM97,FM07
  vuccGrids?: string | undefined;
  // the contacted station's URL
  web?: string | undefined;
  // the contacted station's WWFF (World Wildlife Flora & Fauna) reference
  wwffRef?: string | undefined;
}

export const AdifRecord: Describe<AdifRecord> = type({
  address: optional(MultilineString),
  addressIntl: optional(IntlMultilineString),
  age: optional(Number),
  aIndex: optional(Number),
  antAz: optional(Number),
  antEl: optional(Number),
  antPath: optional(AntPathEnum),
  arrlSect: optional(ArrlSectionEnum),
  awardSubmitted: optional(SponsoredAwardList),
  awardGranted: optional(SponsoredAwardList),
  band: optional(BandEnum),
  bandRx: optional(BandEnum),
  call: optional(String),
  check: optional(String),
  class: optional(String),
  clublogQsoUploadDate: optional(Date),
  clublogQsoUploadStatus: optional(QsoUploadStatusEnum),
  cnty: optional(SecondaryAdministrativeSubdivisionEnum),
  comment: optional(String),
  commentIntl: optional(IntlString),
  cont: optional(ContinentEnum),
  contactedOp: optional(String),
  contestId: optional(String),
  country: optional(String),
  countryIntl: optional(IntlString),
  cqz: optional(PositiveInteger),
  creditSubmitted: optional(CreditList),
  creditGranted: optional(CreditList),
  darcDok: optional(String),
  distance: optional(Number),
  dxcc: optional(DxccEntityCodeEnum),
  email: optional(String),
  eqCall: optional(String),
  eqslQslrdate: optional(Date),
  eqslQslsdate: optional(Date),
  eqslQslRcvd: optional(QslRcvdEnum),
  eqslQslSent: optional(QslSentEnum),
  fists: optional(PositiveInteger),
  fistsCc: optional(PositiveInteger),
  forceInit: optional(Boolean),
  freq: optional(Number),
  freqRx: optional(Number),
  gridsquare: optional(GridSquare),
  hrdlogQsoUploadDate: optional(Date),
  hrdlogQsoUploadStatus: optional(QsoUploadStatusEnum),
  iota: optional(IOTARefNo),
  iotaIslandId: optional(PositiveInteger),
  ituz: optional(PositiveInteger),
  kIndex: optional(Integer),
  lat: optional(Location),
  lon: optional(Location),
  lotwQslrdate: optional(Date),
  lotwQslsdate: optional(Date),
  lotwQslRcvd: optional(QslRcvdEnum),
  lotwQslSent: optional(QslSentEnum),
  maxBursts: optional(Number),
  mode: optional(ModeEnum),
  msShower: optional(String),
  myAntenna: optional(String),
  myAntennaIntl: optional(IntlString),
  myArrlSect: optional(ArrlSectionEnum),
  myCity: optional(String),
  myCityIntl: optional(IntlString),
  myCnty: optional(SecondaryAdministrativeSubdivisionEnum),
  myCountry: optional(String),
  myCountryIntl: optional(IntlString),
  myCqZone: optional(PositiveInteger),
  myDxcc: optional(DxccEntityCodeEnum),
  myFists: optional(PositiveInteger),
  myGridsquare: optional(GridSquare),
  myIota: optional(IOTARefNo),
  myIotaIslandId: optional(PositiveInteger),
  myItuZone: optional(PositiveInteger),
  myLat: optional(Location),
  myLon: optional(Location),
  myName: optional(String),
  myNameIntl: optional(IntlString),
  myPostalCode: optional(String),
  myPostalCodeIntl: optional(IntlString),
  myRig: optional(String),
  myRigIntl: optional(IntlString),
  mySig: optional(String),
  mySigIntl: optional(IntlString),
  mySigInfo: optional(String),
  mySigInfoIntl: optional(IntlString),
  mySotaRef: optional(SOTARef),
  myState: optional(PrimaryAdministrativeSubdivisionEnum),
  myStreet: optional(String),
  myStreetIntl: optional(IntlString),
  myUsacaCounties: optional(SecondarySubdivisionList),
  myVuccGrids: optional(GridSquareList),
  myWwffRef: optional(WWFFRef),
  name: optional(String),
  nameIntl: optional(IntlString),
  notes: optional(MultilineString),
  notesIntl: optional(IntlMultilineString),
  nrBursts: optional(Integer),
  nrPings: optional(Integer),
  operator: optional(String),
  ownerCallsign: optional(String),
  pfx: optional(String),
  precedence: optional(String),
  propMode: optional(PropagationModeEnum),
  publicKey: optional(String),
  qrzcomQsoUploadDate: optional(Date),
  qrzcomQsoUploadStatus: optional(QsoUploadStatusEnum),
  qslmsg: optional(MultilineString),
  qslmsgIntl: optional(IntlMultilineString),
  qslrdate: optional(Date),
  qslsdate: optional(Date),
  qslRcvd: optional(QslRcvdEnum),
  qslRcvdVia: optional(QslViaEnum),
  qslSent: optional(QslSentEnum),
  qslSentVia: optional(QslViaEnum),
  qslVia: optional(String),
  qsoComplete: optional(QsoCompleteEnum),
  qsoDate: optional(Date),
  qsoDateOff: optional(Date),
  qsoRandom: optional(Boolean),
  qth: optional(String),
  qthIntl: optional(IntlString),
  region: optional(RegionEnum),
  rig: optional(MultilineString),
  rigIntl: optional(IntlMultilineString),
  rstRcvd: optional(String),
  rstSent: optional(String),
  rxPwr: optional(Number),
  satMode: optional(String),
  satName: optional(String),
  sfi: optional(Integer),
  sig: optional(String),
  sigIntl: optional(IntlString),
  sigInfo: optional(String),
  sigInfoIntl: optional(IntlString),
  silentKey: optional(Boolean),
  skcc: optional(String),
  sotaRef: optional(SOTARef),
  srx: optional(Integer),
  srxString: optional(String),
  state: optional(PrimaryAdministrativeSubdivisionEnum),
  stationCallsign: optional(String),
  stx: optional(Integer),
  stxString: optional(String),
  submode: optional(String),
  swl: optional(Boolean),
  tenTen: optional(PositiveInteger),
  timeOff: optional(Time),
  timeOn: optional(Time),
  txPwr: optional(Number),
  uksmg: optional(PositiveInteger),
  usacaCounties: optional(SecondarySubdivisionList),
  vuccGrids: optional(GridSquareList),
  web: optional(String),
  wwffRef: optional(WWFFRef),
});

export const blankAdifRecord: AdifRecord = {
  address: undefined,
  addressIntl: undefined,
  age: undefined,
  aIndex: undefined,
  antAz: undefined,
  antEl: undefined,
  antPath: undefined,
  arrlSect: undefined,
  awardSubmitted: undefined,
  awardGranted: undefined,
  band: undefined,
  bandRx: undefined,
  call: undefined,
  check: undefined,
  class: undefined,
  clublogQsoUploadDate: undefined,
  clublogQsoUploadStatus: undefined,
  cnty: undefined,
  comment: undefined,
  commentIntl: undefined,
  cont: undefined,
  contactedOp: undefined,
  contestId: undefined,
  country: undefined,
  countryIntl: undefined,
  cqz: undefined,
  creditSubmitted: undefined,
  creditGranted: undefined,
  darcDok: undefined,
  distance: undefined,
  dxcc: undefined,
  email: undefined,
  eqCall: undefined,
  eqslQslrdate: undefined,
  eqslQslsdate: undefined,
  eqslQslRcvd: undefined,
  eqslQslSent: undefined,
  fists: undefined,
  fistsCc: undefined,
  forceInit: undefined,
  freq: undefined,
  freqRx: undefined,
  gridsquare: undefined,
  hrdlogQsoUploadDate: undefined,
  hrdlogQsoUploadStatus: undefined,
  iota: undefined,
  iotaIslandId: undefined,
  ituz: undefined,
  kIndex: undefined,
  lat: undefined,
  lon: undefined,
  lotwQslrdate: undefined,
  lotwQslsdate: undefined,
  lotwQslRcvd: undefined,
  lotwQslSent: undefined,
  maxBursts: undefined,
  mode: undefined,
  msShower: undefined,
  myAntenna: undefined,
  myAntennaIntl: undefined,
  myArrlSect: undefined,
  myCity: undefined,
  myCityIntl: undefined,
  myCnty: undefined,
  myCountry: undefined,
  myCountryIntl: undefined,
  myCqZone: undefined,
  myDxcc: undefined,
  myFists: undefined,
  myGridsquare: undefined,
  myIota: undefined,
  myIotaIslandId: undefined,
  myItuZone: undefined,
  myLat: undefined,
  myLon: undefined,
  myName: undefined,
  myNameIntl: undefined,
  myPostalCode: undefined,
  myPostalCodeIntl: undefined,
  myRig: undefined,
  myRigIntl: undefined,
  mySig: undefined,
  mySigIntl: undefined,
  mySigInfo: undefined,
  mySigInfoIntl: undefined,
  mySotaRef: undefined,
  myState: undefined,
  myStreet: undefined,
  myStreetIntl: undefined,
  myUsacaCounties: undefined,
  myVuccGrids: undefined,
  myWwffRef: undefined,
  name: undefined,
  nameIntl: undefined,
  notes: undefined,
  notesIntl: undefined,
  nrBursts: undefined,
  nrPings: undefined,
  operator: undefined,
  ownerCallsign: undefined,
  pfx: undefined,
  precedence: undefined,
  propMode: undefined,
  publicKey: undefined,
  qrzcomQsoUploadDate: undefined,
  qrzcomQsoUploadStatus: undefined,
  qslmsg: undefined,
  qslmsgIntl: undefined,
  qslrdate: undefined,
  qslsdate: undefined,
  qslRcvd: undefined,
  qslRcvdVia: undefined,
  qslSent: undefined,
  qslSentVia: undefined,
  qslVia: undefined,
  qsoComplete: undefined,
  qsoDate: undefined,
  qsoDateOff: undefined,
  qsoRandom: undefined,
  qth: undefined,
  qthIntl: undefined,
  region: undefined,
  rig: undefined,
  rigIntl: undefined,
  rstRcvd: undefined,
  rstSent: undefined,
  rxPwr: undefined,
  satMode: undefined,
  satName: undefined,
  sfi: undefined,
  sig: undefined,
  sigIntl: undefined,
  sigInfo: undefined,
  sigInfoIntl: undefined,
  silentKey: undefined,
  skcc: undefined,
  sotaRef: undefined,
  srx: undefined,
  srxString: undefined,
  state: undefined,
  stationCallsign: undefined,
  stx: undefined,
  stxString: undefined,
  submode: undefined,
  swl: undefined,
  tenTen: undefined,
  timeOff: undefined,
  timeOn: undefined,
  txPwr: undefined,
  uksmg: undefined,
  usacaCounties: undefined,
  vuccGrids: undefined,
  web: undefined,
  wwffRef: undefined,
};
